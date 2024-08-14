import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCVHUqGJCcYL750D85VfHalEEvov2ub-4w",
    authDomain: "fir-3e668.firebaseapp.com",
    projectId: "fir-3e668",
    storageBucket: "fir-3e668.appspot.com",
    messagingSenderId: "356794976032",
    appId: "1:356794976032:web:6f11943aefc82fae41b945",
    measurementId: "G-BK4H75VHHL"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword };
