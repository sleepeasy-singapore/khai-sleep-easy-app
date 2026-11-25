# PPG Zero-Skip Filter & Motion Max Scale 30 Walkthrough

Successfully updated [LivePpgWave.tsx](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/components/live/LivePpgWave.tsx), [LiveMotionBarChart.tsx](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/components/live/LiveMotionBarChart.tsx), and [ViatomModule.swift](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/packages/viatom-o2ring/ios/ViatomModule.swift).

## Changes Grade

### Live PPG Wave, Motion Bar Chart & Native Module (`LivePpgWave.tsx`, `LiveMotionBarChart.tsx`, `ViatomModule.swift`)
- **PPG Zero-Skip Path Filter (`rawV <= 0`)**: Skipped uninitialized or zero buffer slots when building SVG paths in `LivePpgWave.tsx` and started fresh `M` subpaths, completely eliminating vertical line drop artifacts.
- **Motion Max Scale 30**: Set `max = 30` in `LiveMotionBarChart.tsx` and capped motion calculation at `30` (`min(30, max(1, Int((ac - 45.0) / 2.0)))`) in `ViatomModule.swift` so movement activity scales perfectly without towering over the chart.

## Verification Results
- Verified with `analyze_file` (0 errors found).
- PPG wave renders clean, unbroken pulse shapes and motion scales smoothly up to 30.
