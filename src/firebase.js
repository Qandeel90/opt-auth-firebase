import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBlcXZQJO-sMscgL5kkuAIzexIS7MPWE5U",
  authDomain: "fir-auth-bd87b.firebaseapp.com",
  projectId: "fir-auth-bd87b",
  storageBucket: "fir-auth-bd87b.appspot.com",
  messagingSenderId: "758942184853",
  appId: "1:758942184853:web:af668418ebc0f0cd94b29c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
