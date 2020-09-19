
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "onesignal-cordova-plugin.OneSignal",
          "file": "plugins/onesignal-cordova-plugin/www/OneSignal.js",
          "pluginId": "onesignal-cordova-plugin",
        "clobbers": [
          "OneSignal"
        ]
        },
      {
          "id": "cordova-plugin-app-preferences.apppreferences",
          "file": "plugins/cordova-plugin-app-preferences/www/apppreferences.js",
          "pluginId": "cordova-plugin-app-preferences",
        "clobbers": [
          "plugins.appPreferences"
        ]
        },
      {
          "id": "phonegap-plugin-push.PushNotification",
          "file": "plugins/phonegap-plugin-push/www/push.js",
          "pluginId": "phonegap-plugin-push",
        "clobbers": [
          "PushNotification"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-app-preferences": "0.99.3",
      "onesignal-cordova-plugin": "2.11.1",
      "phonegap-plugin-push": "2.3.0"
    };
    // BOTTOM OF METADATA
    });
    