// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { LocalStorage } from "quasar";
import { getStorage } from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8m-i5A_tgRDNmKyCZBIxj7hNB5bFYPFk",
  authDomain: "shoe-blogger-app.firebaseapp.com",
  projectId: "shoe-blogger-app",
  storageBucket: "shoe-blogger-app.appspot.com",
  messagingSenderId: "663573109748",
  appId: "1:663573109748:web:48029211cdba0df6a077a1",
  storageBucket: "shoe-blogger-app.appspot.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth(app);

const storage = getStorage(app);


onAuthStateChanged(auth, user =>{
  if (user) LocalStorage.set('user', user)
    else LocalStorage.remove("user")
})

const currentUser = auth.currentUser;

export { db, auth, storage, currentUser };
