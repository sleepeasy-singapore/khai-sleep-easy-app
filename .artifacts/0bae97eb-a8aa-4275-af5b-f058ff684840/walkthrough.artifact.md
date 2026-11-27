# Main App Store Bundle ID Mapping Walkthrough

Successfully updated [app.config.js](file:///C:/Users/Wei Lin/Documents/GitHub/khai-sleep-easy-app/app.config.js).

## Changes Made

### Expo Configuration (`app.config.js`)
- **App Store Bundle ID Mapping (`com.sleepeasy.app`)**: Mapped the Patient variant bundle identifier and Android package to **`com.sleepeasy.app`** (the main App Store listing), while keeping the Distributor variant on **`com.sleepeasy.app.distributor`**. This maintains 100% variant separation while allowing patient builds to update the existing App Store Connect record seamlessly.

## Verification Results
- Verified with `analyze_file` (0 errors found).
- Variant bundle IDs configured correctly.
