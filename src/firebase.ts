import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzDND3dgbPnb_dSqDtA1Nu0Q3rqejnPTs",
  authDomain: "discord-clone-1b57e.firebaseapp.com",
  projectId: "discord-clone-1b57e",
  storageBucket: "discord-clone-1b57e.appspot.com",
  messagingSenderId: "748951138554",
  appId: "1:748951138554:web:91c686f8481f2a1fc75943"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
// Google認証用のプロバイダーをインスタンス化
const provider = new GoogleAuthProvider();

export { auth, provider, db };