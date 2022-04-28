// Import the functions you need from the SDKs you need
import { getAuth, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBn_rhxITYNKbAONiEhXtl91Vd6c13JX8E",
  authDomain: "fir-auth-74cdc.firebaseapp.com",
  projectId: "fir-auth-74cdc",
  storageBucket: "fir-auth-74cdc.appspot.com",
  messagingSenderId: "17158537742",
  appId: "1:17158537742:web:86e8ff38cc84818aae325f",
};

// Initialize Firebase
// V9 below
// const app = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
onAuthStateChanged(auth, (user) => {
  // Check for user status
});

export { auth };
// V8 below

// let app;
// if (firebase.apps.length === 0) {
//   app = firebase.initializeApp(firebaseConfig);
// } else {
//   app = firebase.app();
// }

// const auth = firebase.auth();

// export { auth };
