import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: "AIzaSyBn_rhxITYNKbAONiEhXtl91Vd6c13JX8E",
  authDomain: "fir-auth-74cdc.firebaseapp.com",
  projectId: "fir-auth-74cdc",
  storageBucket: "fir-auth-74cdc.appspot.com",
  messagingSenderId: "17158537742",
  appId: "1:17158537742:web:86e8ff38cc84818aae325f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { auth };
