import { addDoc, collection, query, getDoc, where } from "firebase/firestore"
import {defineStore} from "pinia"
import { Loading, Notify } from "quasar";
import { db, auth, currentUser } from "src/firebase/firebase";
import { createUserWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth'

const userCollection = collection(db, "users")
// const userID = currentUser.uid

 export const useUserStore = defineStore("fireStore", {
  state: () => ({
    users: Object,
    user: Object
  }),
  actions: {
    fetchCurrentUser(){
      // const userRef = doc(db, "users", "")
      // const userID = currentUser.uid
      const q = query(userCollection, where("userId", "==", currentUser.uid))
      const userSnap =  getDoc(q)
      return userSnap
    },
    async userRegistration(details){
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
    },
    async addUser(details){
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
    },
    async userSignOut(){
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

  }
})

