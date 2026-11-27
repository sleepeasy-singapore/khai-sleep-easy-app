# Technical Documentation: Session Persistence & Reconnection Ghosting Fix

## Overview
When disconnecting from an O2Ring session and immediately reconnecting, telemetry points and waveform data from the **previous session** previously remained visible on the dashboard charts due to React state persistence across Bluetooth connection lifecycles.

---

## 1. Root Cause Analysis (`Why It Happened`)
1. **Disconnected State Isolation**: Disconnecting the O2Ring sets `connectedDevice` to `null`, but the state variables holding the chart series (`spo2Series`, `prSeries`, `motionSeries`) were not automatically flushed to empty `[]` on disconnect.
2. **Mac Address Re-Use**: When reconnecting immediately, the device MAC address (`connectedDevice?.mac`) was identical to the previous session, causing hooks keyed solely to the MAC address to detect no change (`mac === mac`), skipping the re-initialization flush.

---

## 2. The Applied Solution (`Session-Scoped Reset Key`)

To ensure previous session data is purged *immediately* upon reconnection, chart hooks are now keyed to a session-unique identifier (`sessionResetKey`) rather than just the static MAC address.

### Implementation Details:
1. **Unique Session ID on Connect**:
   Whenever `O2Ring.connect()` succeeds, `connectionSessionId` updates to the current timestamp (`Date.now()`).
2. **Compound Reset Key (`sessionResetKey`)**:
   A compound reset key is passed into `useReadingSeries`:
   ```typescript
   const sessionResetKey = `${connectedDevice?.mac ?? "none"}_${connectionSessionId}`;
   ```
3. **Instant Purge on Connection Change (`useReadingSeries.ts`)**:
   When `sessionResetKey` changes upon reconnection, `useEffect` detects the difference and immediately executes `setPoints([])`, flushing all previous session points instantly:
   ```typescript
   useEffect(() => {
     if (resetKey != null && resetKey !== prevResetKey.current) {
       prevResetKey.current = resetKey;
       setPoints([]); // Instantly clears previous session data on reconnect
       lastStamp.current = null;
     }
   }, [resetKey]);
   ```
