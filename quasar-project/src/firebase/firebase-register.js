import { auth } from 'src/firebase/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { Loading, Notify } from 'quasar'


const register = (data) => {
 return new Promise((resolve, reject) => {
  Loading.show()

  createUserWithEmailAndPassword(auth, data.email, data.password).then(userCredential => {
    updateProfile(userCredential.user, {
    displayName: data.name + " " + data.surname
   })

   Loading.hide()
   resolve(userCredential.user)
  }).catch(err => {

    Loading.hide()
    Notify.create({
      type: 'negative',
      message: err.message
    })
    reject(err.message)
  })
 })
}

export default register
