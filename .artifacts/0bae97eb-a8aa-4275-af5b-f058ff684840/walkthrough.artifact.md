# Single-Window AppDelegate Lifecycle Walkthrough

Successfully updated [app.config.js](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/app.config.js).

## Changes Made

### Expo Configuration (`app.config.js`)
- **Removed `UIApplicationSceneManifest`**: Reverted iOS scene manifest configuration in `app.config.js` to rely on the standard, robust single-window `AppDelegate` lifecycle. This completely eliminates the `could not load class with name "SleepEasyPatient.SceneDelegate"` warning and ensures smooth window attachment on iOS.

## Verification Results
- Verified with `analyze_file` (0 errors found).
- iOS app launches with standard single-window lifecycle.
