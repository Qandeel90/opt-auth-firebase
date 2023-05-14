import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwp1vhUiPuDXkUxAry9bArekEN6noLugY",
  authDomain: "otp-auth-firebase-1.firebaseapp.com",
  projectId: "otp-auth-firebase-1",
  storageBucket: "otp-auth-firebase-1.appspot.com",
  messagingSenderId: "264039204633",
  appId: "1:264039204633:web:b0c8b1b02a213c1640e788",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
