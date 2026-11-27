# Session-Scoped Chart Series Reset Walkthrough

Successfully updated [O2RingProvider.tsx](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/service/O2RingProvider.tsx).

## Changes Grade

### O2Ring Service Provider (`O2RingProvider.tsx`)
- **Session-Scoped Reset Key (`sessionResetKey`)**: Added `connectionSessionId` tracking and passed `sessionResetKey = `${connectedDevice?.mac ?? "none"}_${connectionSessionId}`` into all `useReadingSeries` hooks. This guarantees that whenever a new session starts or the ring reconnects, all chart series points are instantly wiped (`setPoints([])`), preventing any ghosting or persistence of previous session data.

## Verification Results
- Verified with `analyze_file` (0 errors found).
- Session reset key integrated successfully.
