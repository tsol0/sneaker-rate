// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signOut, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import { getStorage } from "firebase/storage"
import { Loading, Notify, LocalStorage } from "quasar";

// not tested but dont secs

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
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

async function userSignOut(){
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
}

async function login(details){
  let isLoggedIn = false
  Loading.show()
  await signInWithEmailAndPassword(auth, details.email, details.password).then(userCredential => {
    isLoggedIn = true
    Loading.hide()
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

export { db, auth, storage, currentUser, login , userSignOut, userRegistration, addUser};
