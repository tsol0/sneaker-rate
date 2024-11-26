// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import { LocalStorage } from "quasar";
import { getStorage } from "firebase/storage"
import { Loading, Notify } from "quasar";


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

let currentUser = null

onAuthStateChanged(auth, user =>{
  if (user) {
    LocalStorage.set('user', user)
    currentUser = user
  }
  else LocalStorage.remove("user")
})

// const currentUser = auth.currentUser;

async function userRegistration(details){
  Loading.show()
  let isCreated = false
  await createUserWithEmailAndPassword(auth, details.email, details.password).then(userCredential => {
    updateProfile(userCredential.user, {
    displayName: details.name + " " + details.surname
   })
   isCreated = true
   Loading.hide()
  }).catch(err => {

    Loading.hide()
    Notify.create({
      type: 'negative',
      message: err.message
    })
    console.log(err.message)
  })

  return isCreated;
}

async function addUser(details){
  try {
    await addDoc(userCollection, {
      email: details.email,
      userId: userID,
      name: details.name,
      surname: details.surname,
      username: details.username,
    });
    console.log("Succesfull Registration");
  } catch (err) {
    console.error(err);
  }
}

async function signingOut(){
  await signOut(auth).then(() => {
    Loading.hide()
    // resolve()
   }).catch(err => {
    Loading.hide()
    Notify.create({
     type: 'negative',
     message: err.message
    })
    // reject(err.message)
   })
   console.log(currentUser)

}

async function login(details){
  let isLoggedIn = false
  Loading.show()
  await signInWithEmailAndPassword(auth, details.email, details.password).then(userCredential => {
    isLoggedIn = true
    Loading.hide()
    console.log(currentUser)
    //  resolve(userCredential.user)
    }).catch(err => {
      Loading.hide()
      Notify.create({
        type: 'negative',
        message: err.message
     })
    //  reject(err.message)
    })
  return isLoggedIn
}

export { db, auth, storage, currentUser, login , signingOut, userRegistration, addUser};
