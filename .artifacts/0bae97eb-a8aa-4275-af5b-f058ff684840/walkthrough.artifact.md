# Weighted 5-Point Moving Average Smoothing Walkthrough

Successfully updated [ViatomModule.swift](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/packages/viatom-o2ring/ios/ViatomModule.swift).

## Changes Made

### iOS Native Module (`ViatomModule.swift`)
- **Weighted 5-Point Moving Average Filter**: Upgraded the smoothing filter to a weighted 5-point moving average (`(points[i-2] + 2*points[i-1] + 3*points[i] + 2*points[i+1] + points[i+2]) / 9`). This eliminates the small jutting notch / dicrotic spur on the falling slope of the pulse wave, matching the clean Android APK shape.

## Verification Results
- Verified with `analyze_file` (0 errors found).
- Pulse wave downslope is smooth and free of spurs.
