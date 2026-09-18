// Drops the APNs entitlement that expo-notifications adds on iOS.
//
// Reminders are local notifications, scheduled on the phone; they need no
// push capability. The plugin adds `aps-environment` regardless, and a build
// then needs a provisioning profile with Push Notifications enabled — which
// ours does not have, so build 9 failed on exactly that.
//
// It is listed BEFORE expo-notifications in app.json on purpose: a later
// plugin in the list runs first and hands its result to the earlier ones,
// so this one runs last and has the final say.
//
// Remove this plugin (and enable the capability on the App ID, then regenerate the profile with
// `eas credentials`) the day the app sends remote push.
const { withEntitlementsPlist } = require('expo/config-plugins');

module.exports = function withoutPushEntitlement(config) {
  return withEntitlementsPlist(config, (c) => {
    delete c.modResults['aps-environment'];
    return c;
  });
};
