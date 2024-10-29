<template>
  <q-page padding>
    <q-form @submit="submitReview" class="styled-form">
      <q-input v-model="sneakername" label="Sneaker name" outlined required />
      <q-input v-model="username" label="Username" outlined required />
      <q-input
        v-model="review"
        label="Review"
        type="textarea"
        outlined
        required
      />
      <!-- <q-uploader
        url="http://localhost:4444/upload"
        label="Upload files"
        color="primary"
        square
        flat
        bordered
        style="max-width: 300px"
      /> -->
      <q-rating
        v-model="rating"
        max="5"
        size="2em"
        color="yellow"
        icon="star_border"
        icon-selected="star"
        icon-half="star_half"
        no-dimming
      />
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

import { ref } from "vue";
import { useStore } from "../stores/StoreReviews";

const store = useStore();

const review = ref("");
const rating = ref(0);
const username = ref("");
const sneakername = ref("");

const submitReview = async () => {
  await store.addReview(
    review.value,
    rating.value,
    username.value,
    sneakername.value
  );

  review.value = "";
  rating.value = 0;
  username.value = "";
  sneakername.value = "";
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
