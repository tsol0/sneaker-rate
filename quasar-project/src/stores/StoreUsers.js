import { setDoc, doc } from "firebase/firestore"
import {defineStore} from "pinia"

 export const useUserStore = defineStore("fireStore", {
  state: () => ({
    users: Object,
  }),
  actions: {
    async addUser(user){
      let userID = Math.floor(1000000 + Math.random() * 9000000).toString();

      try {
        await setDoc(doc(db, "users", userID),{
          name: user.name,
          surname: user.surname,
          username: user.username,
          email: user.email,
          id: userID
        })
      } catch (err) {
        console.error(err)
      }
    }

  }
})

