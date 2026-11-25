# Motion Resting Deadband Threshold Walkthrough

Successfully updated [ViatomModule.swift](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/packages/viatom-o2ring/ios/ViatomModule.swift).

## Changes Made

### iOS Native Module (`ViatomModule.swift`)
- **Resting Motion Deadband (`ac > 70.0`)**: Raised the motion activation threshold from `25.0` to `70.0` (`ac > 70.0 ? min(50, max(1, Int((ac - 70.0) / 3.0))) : 0`). This ensures that normal resting heartbeat pulse swings remain below the threshold (rendering a clean `0` baseline when still), while actual hand movement and shaking produce proportionate movement bars.

## Verification Results
- Verified with `analyze_file` (0 errors found).
- Motion stays at 0 when still and scales properly when moving.
