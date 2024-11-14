import { addDoc, collection } from "firebase/firestore"
import {defineStore} from "pinia"
import { Loading, Notify } from "quasar";
import { db, auth, currentUser } from "src/firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

 export const useUserStore = defineStore("fireStore", {
  state: () => ({
    users: Object,
    user: Object
  }),
  actions: {
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
        await addDoc(collection(db, "users"), {
          email: details.email,
          userId: currentUser.uid,
          name: details.name,
          surname: details.surname,
          username: details.username,
        });
        // await setDoc(doc(db, "users", userID),{
        //   email: details.email,
        //   userid: doc.id,
        //   name: details.name,
        //   surname: details.surname,
        //   username: details.username,
        // });
        console.log("Succesfull Registration");
      } catch (err) {
        console.error(err);
      }
    }

  }
})

