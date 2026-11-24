# Motion Chart Left-to-Right Time Window Walkthrough

Successfully updated [LiveMotionBarChart.tsx](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/components/live/LiveMotionBarChart.tsx).

## Changes Grade

### Motion Bar Chart (`LiveMotionBarChart.tsx`)
- **Left-to-Right Time Progress (`t0 = first`, `tN = first + span`)**: Updated time window calculations in `LiveMotionBarChart.tsx` to match `LiveTrendChart`. Motion activity bars now start on the left and progress toward the right over time, matching all other dashboard charts.

## Verification Results
- Verified with `analyze_file` (0 errors found).
- Motion time axis starts from the left correctly.
