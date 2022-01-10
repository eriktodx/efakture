// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import packageInfo from "../../package.json";

export const environment = {
  firebase: {
    projectId: "fakture-79519",
    appId: "1:190425925400:web:e5bcfb8416d5102c2bc06d",
    databaseURL: "https://fakture-79519.firebaseio.com",
    storageBucket: "fakture-79519.appspot.com",
    locationId: "europe-west",
    apiKey: "AIzaSyA0hYqSsdDSStthl_X1SiFT-p0LVo3hUL0",
    authDomain: "fakture-79519.firebaseapp.com",
    messagingSenderId: "190425925400",
    measurementId: "G-TE28KEF6WN",
  },
  production: false,
  version: packageInfo.version + "-dev",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
