# Conditional Real-Time Motion Omission Walkthrough

Successfully updated [ViatomModule.swift](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/packages/viatom-o2ring/ios/ViatomModule.swift).

## Changes Made

### iOS Native Module (`ViatomModule.swift`)
- **Conditional Motion Omission (`realDataCallBack`)**: Updated `realDataCallBack` to only attach `"motion"` if `realData.vector > 0`. When stationary (`vector == 0`), motion is omitted entirely from vitals emission so it never overwrites the active waveform-derived motion updates coming from `realWaveCallBack`.

## Verification Results
- Verified with `analyze_file` (0 errors found).
- Motion updates stream cleanly without zero-overwrite conflicts.
