import { defineStore } from "pinia";
import { db } from "src/firebase/firebase";
import {
  collection,
  getDocs,
  setDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ref } from "firebase/storage";
import { Loading } from "quasar";

export const useReviewsStore = defineStore("firebaseStore", {
  state: () => ({
    reviews: Object,
  }),
  actions: {
    // async getImagebyUser(username, id){
    //   try {
    //     Loading.show()
    //     const pathReference = ref(storage, 'images/stars.jpg');
    //     // Create a reference from a Google Cloud Storage URI
    //     const gsReference = ref(storage, 'gs://bucket/images/stars.jpg');

    //     // Create a reference from an HTTPS URL
    //     // Note that in the URL, characters are URL escaped!
    //     const httpsReference = ref(storage, 'https://firebasestorage.googleapis.com/b/bucket/o/images%20stars.jpg');
    //   } catch (err) {
    //    console.error(err);
    //   }
    // },
    async getReviews() {
      Loading.show()
      const reviewsCollection = collection(db, "reviews")
      const reviewsSnapshot = await getDocs(reviewsCollection)
      const reviewsList = reviewsSnapshot.docs.map((doc) => doc.data())
      Loading.hide()
      return reviewsList
    },
    async addReview(review, rating, username, sneakername) {
      let reviewID = Math.floor(1000000 + Math.random() * 9000000).toString();

      try {
        await setDoc(doc(db, "reviews", reviewID), {
          rating: rating,
          review: review,
          sneakername: sneakername,
          username: username,
          id: reviewID,
        });

        // console.log("Document written with ID: ", docRef.id);
      } catch (error) {
        console.error(error);
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
        console.log(error);
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
