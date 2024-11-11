<template>
  <q-page padding>
    <q-form @submit.prevent="submitReview" class="styled-form">
      <q-input v-model="review.sneakername" label="Sneaker name" outlined required />
      <q-input v-model="review.username" label="Username" outlined required />
      <q-input
        v-model="review.review"
        label="Review"
        type="textarea"
        outlined
        required
      />
      <div class="q-pa-md">
        <!-- <q-uploader
          url="http://localhost:4444/upload"
          label="Batch upload"
          multiple
          batch
          style="max-width: 300px"
        /> -->
        <q-input filled type="file" @update:model-value="upVal" required/>
        <q-rating
          v-model="review.rating"
          max="5"
          size="2em"
          color="yellow"
          icon="star_border"
          icon-selected="star"
          icon-half="star_half"
          no-dimming
          required
        />
      </div>
      <!-- <q-rating v-model="rating" :max="5" required /> -->
      <div class="form-actions">
        <q-btn type="submit" label="Submit" color="primary" />
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "ReviewForm",
});

import { reactive } from "vue";
import { useReviewsStore } from "../stores/StoreReviews";
import { ref } from "firebase/storage";


const store = useReviewsStore();

const review = reactive({
  review: "",
  rating: 0,
  username: "",
  sneakername: "",
  file: null
})

// const file = ref(null)
// const inValSubmitted = ref("not sbmitted yet")

const upVal = e =>{
  review.file = e[0];
}

const submitReview = async () => {
  review.file != null ? console.log("hello",review.file.name) : console.log("nope");

  await store.addReview(
    review);

    review.sneakername = ""
    review.username = ""
    review.rating = 0
    review.review = ""
    review.file = null
};


</script>

<style scoped>
.styled-form {
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  background-color: #fff;
}

.form-actions {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
