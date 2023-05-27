import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCIj03fpoESIpfUIV_Y0pEsAAEliKsiPiI",
    authDomain: "skillsonic-aac17.firebaseapp.com",
    projectId: "skillsonic-aac17",
    storageBucket: "skillsonic-aac17.appspot.com",
    messagingSenderId: "216391004584",
    appId: "1:216391004584:web:8b46b75c84c8aa92f2ad9d"
  };



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage, collection };
export default app;