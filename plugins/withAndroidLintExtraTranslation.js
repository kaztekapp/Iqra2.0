// Stops Android's release lint from failing on the iOS Info.plist localizations.
//
// app.json's `locales` field localizes the iOS Info.plist (the app name and the
// microphone / speech / photo-library purpose strings). Expo also emits those
// same keys into Android's per-locale string resources (values-b+en, values-b+fr),
// but they are iOS-only keys with no entry in the default Android locale. Android's
// `lintVitalRelease` then fails every release build with `ExtraTranslation`:
// "translated here but not found in default locale". That is what broke the first
// Android build made after the launch `locales` config was added.
//
// The strings are deliberately translated for iOS, so the check is a false
// positive on Android. Disabling just `ExtraTranslation` clears it without
// touching any real missing-translation coverage or app behavior.
const { withAppBuildGradle } = require('expo/config-plugins');

module.exports = function withAndroidLintExtraTranslation(config) {
  return withAppBuildGradle(config, (c) => {
    if (c.modResults.language !== 'groovy') return c;
    let src = c.modResults.contents;
    if (src.includes("disable 'ExtraTranslation'")) return c;

    // Insert a lint block as the first thing inside the top-level `android {`.
    const marker = /android\s*\{/;
    if (!marker.test(src)) {
      throw new Error('withAndroidLintExtraTranslation: no `android {` block in app/build.gradle');
    }
    c.modResults.contents = src.replace(
      marker,
      (m) => `${m}\n    lint {\n        disable 'ExtraTranslation'\n    }`,
    );
    return c;
  });
};
