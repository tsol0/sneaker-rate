import { defineStore } from "pinia";
import { db, storage, currentUser } from "src/firebase/firebase";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Loading } from "quasar";

const reviewsCollection = collection(db, "reviews")


export const useReviewsStore = defineStore("reviewStore", {
  state: () => ({
    reviews: Object,
    filteredReviews: null
  }),
  actions: {
    async getReviews() {
      Loading.show()
      const reviewsSnapshot = await getDocs(reviewsCollection)
      const reviewsList = reviewsSnapshot.docs.map((doc) => doc.data())
      Loading.hide()
      this.reviews = reviewsList
      // return reviewsList
    },

    async getFilteredReview(username){
      Loading.show()
      const q = query(reviewsCollection, where("username", "==", username))
      const reviewsSnapshot = await getDocs(q)
      reviews = reviewsSnapshot.docs.map((doc) => doc.data())

      Loading.hide()
      this.filteredReviews = reviews
      // return filteredReviews
    },
    async addReview(reviewObject) {
      // get user username from firebase and then insert it into the review object
      // let userID = currentUser.uid;
      // const currentUserQuery = query()
      const reviewID = Math.floor(1000000 + Math.random() * 9000000).toString();

      try {

        // image upload to e.g username/reviewid
        const imageRef = ref(storage, `${reviewObject.username}/${reviewID}/${reviewObject.file.name}`)
        await uploadBytes(imageRef, reviewObject.file).then(snapshot =>{
          console.log('Uploaded image!')
        })
        // const snapshot = await storage.imageRef.put(reviewObject.imageUrl)

        const url = await getDownloadURL(imageRef)

        await setDoc(doc(db, "reviews", reviewID), {
          rating: reviewObject.rating,
          review: reviewObject.review,
          sneakername: reviewObject.sneakername,
          username: reviewObject.username,
          imageUrl: url,
          id: reviewID,
        });

      } catch (error) {
        console.error("The following error occured:", error);
      }
    },

    async changeReview(id, rating, review, sneakername, username) {
      try {
        await updateDoc(doc(db, "reviews", id), {
          rating: rating,
          review: review,
          sneakername: sneakername,
          username: username,
          // createdAt: new Date(),
        });
        console.log("Update succesfull");
      } catch (error) {
        console.error("The following error occured:", error);
        // console.log(error);
      }
    },

    async deleteReview(id) {
      try {
        await deleteDoc(doc(db, "reviews", id));
      } catch (error) {
        console.log("Delete function is having issues");
      }
    },
  },
});
