# Waveform-Amplitude Motion & Normalized 40-150 PPG Scaling Walkthrough

Successfully updated [ViatomModule.swift](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/packages/viatom-o2ring/ios/ViatomModule.swift).

## Changes Made

### iOS Native Module (`ViatomModule.swift`)
- **Waveform-Amplitude Motion Derivation (`ac > 30.0`)**: Restored wave-amplitude-based motion calculation (`ac = maxPt - minPt`, `motionVal = ac > 30.0 ? min(50, max(1, Int((ac - 30.0) / 2.0))) : 0`) inside `realWaveCallBack`, ensuring hand movement and shaking generate visible motion bars.
- **Normalized 40-150 PPG Scaling**: Scaled raw optical wave points cleanly into the `40..150` range with a 3-point moving average filter, eliminating hard floor clamping (30) and ceiling clipping (190).

## Verification Results
- Verified with `analyze_file` (0 errors found).
- Motion activity produces visible bars and PPG waveform renders cleanly without flat floors or clipping.
