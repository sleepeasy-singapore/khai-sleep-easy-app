# Motion Chart Max Scale Sensitivity Walkthrough

Successfully updated [LiveMotionBarChart.tsx](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/components/live/LiveMotionBarChart.tsx).

## Changes Made

### Motion Bar Chart (`LiveMotionBarChart.tsx`)
- **Optimized Motion Max Scale (`max = 20`)**: Lowered the Motion chart maximum scale from `150` to `20`. Because Viatom's raw motion vector values typically range from `0` to `15` during movement, scaling to `20` ensures motion bars fill up a clear, prominent height when shaking or moving.

## Verification Results
- Verified with `analyze_file` (0 errors found).
- Motion chart sensitivity optimized.
