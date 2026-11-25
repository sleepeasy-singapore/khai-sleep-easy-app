import React, { useState } from "react";
import { LayoutChangeEvent, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Svg, { Line, Text as SvgText } from "react-native-svg";
import { useTheme } from "../../theme/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import type { SeriesPoint } from "./useReadingSeries";

type Props = {
  title: string;
  currentLabel?: string;
  points: SeriesPoint[];
  height?: number;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
};

const pad2 = (n: number) => String(n).padStart(2, "0");
const clock = (t: number) => {
  const d = new Date(t);
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}:${pad2(d.getSeconds())}`;
};

export default function LiveMotionBarChart({
  title,
  points,
  height = 38,
  onMoveUp,
  onMoveDown,
}: Props) {
  const { colors: C } = useTheme();
  const [width, setWidth] = useState(0);

  const onLayout = (e: LayoutChangeEvent) =>
    setWidth(Math.round(e.nativeEvent.layout.width));

  const max = 30;
  const accent = "#F5A25D";
  const safePoints = points ?? [];
  const first = safePoints.length > 0 ? safePoints[0].t : Date.now();
  const last = safePoints.length > 0 ? safePoints[safePoints.length - 1].t : first + 30000;
  const windowMs = 2 * 60 * 1000;
  const span = Math.max(last - first, windowMs);
  const t0 = first;
  const tN = first + span;

  return (
    <View style={[styles.card, { backgroundColor: C.bg2, borderColor: C.border }]}>
      <View style={styles.headRow}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
          <Text style={[styles.title, { color: C.text }]} numberOfLines={1}>{title}</Text>
          {(onMoveUp || onMoveDown) && (
            <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
              {onMoveUp && (
                <TouchableOpacity onPress={onMoveUp} style={{ padding: 2 }} activeOpacity={0.7}>
                  <Ionicons name="chevron-up" size={16} color={C.sub} />
                </TouchableOpacity>
              )}
              {onMoveDown && (
                <TouchableOpacity onPress={onMoveDown} style={{ padding: 2 }} activeOpacity={0.7}>
                  <Ionicons name="chevron-down" size={16} color={C.sub} />
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </View>

      <View
        onLayout={onLayout}
        style={{
          height,
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: C.border,
          overflow: "hidden",
        }}>
        {width > 0 && (
          <Svg width={width} height={height}>
            {/* Grid baselines */}
            <Line
              x1={0}
              x2={width}
              y1={height}
              y2={height}
              stroke={C.border}
              strokeWidth={1}
            />
            <Line
              x1={0}
              x2={width}
              y1={height / 2}
              y2={height / 2}
              stroke={C.border}
              strokeWidth={1}
              strokeDasharray="3,3"
            />
            {/* Motion bars */}
            {safePoints.map((p, idx) => {
              if (span <= 0) return null;
              const x = ((p.t - t0) / span) * width;
              const v = Math.min(max, Math.max(0, p.v));
              const h = (v / max) * (height - 6);
              const y = height - h;
              return (
                <Line
                  key={idx}
                  x1={x}
                  x2={x}
                  y1={height}
                  y2={y}
                  stroke={accent}
                  strokeWidth={1.5}
                />
              );
            })}
          </Svg>
        )}
      </View>
      {/* Time axis */}
      <View style={styles.timeRow}>
        <Text style={[styles.time, { color: C.sub }]}>
          {safePoints.length > 0 ? clock(t0) : ""}
        </Text>
        <Text style={[styles.time, { color: C.sub }]}>
          {safePoints.length > 0 ? clock(tN) : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 8,
    marginBottom: 6,
  },
  headRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 4,
  },
  title: { fontSize: 13, fontWeight: "700" },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },
  time: { fontSize: 9 },
});
