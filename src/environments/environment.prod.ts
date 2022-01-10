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
  production: true,
  version: packageInfo.version,
};
