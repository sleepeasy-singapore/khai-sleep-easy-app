# Runtime Version Configuration Walkthrough

Successfully updated [app.config.js](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/app.config.js).

## Changes Made

### Expo Configuration (`app.config.js`)
- **Added `runtimeVersion` (`policy: "appVersion"`)**: Added `runtimeVersion` configuration alongside `updates.url` in `app.config.js`. This resolves the `expo-updates` initialization warning and allows over-the-air updates to sync correctly with the app version.

## Verification Results
- Verified with `analyze_file` (0 errors found).
- Runtime version configured successfully.
