// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const firebaseConfig = {
  apiKey: "AIzaSyBNKYz4k9zJdHPtL1Q8EWN6FNAyRoKj5Ls",
  authDomain: "angulartodo-ecdd5.firebaseapp.com",
  projectId: "angulartodo-ecdd5",
  storageBucket: "angulartodo-ecdd5.appspot.com",
  messagingSenderId: "33134460082",
  appId: "1:33134460082:web:02b16c4fc2191eba545dab",
  measurementId: "G-3ZZ4CCEPGC"
};

export const environment = {
  production: false,
  firebase: firebaseConfig
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
