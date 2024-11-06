<template>
  <q-page padding>
    <div>
      <h4>Find review by username</h4>
      <q-form @submit="loadFilteredReviews">
        <q-input v-model="username" label="Enter Username" filled required
        />
        <q-btn type="submit" label="find" color="primary"/>
      </q-form>

      <q-list v-if="filteredReviews.length > 0">
        <q-item v-for="review in filteredReviews" :key="review.id" clickable>
        <ReviewCard :review="review" />
        </q-item>
      </q-list>
    <p v-else>No Reviews to display.</p>
    </div>
    <h4>All Reviews</h4>
    <q-list>
      <q-item v-for="review in reviewsList" :key="review.id" clickable>
        <ReviewCard :review="review" @open-dialog="showDialog" />
      </q-item>
    </q-list>
    <ReviewDialog
      v-model="dialogVisible"
      :review="selectedReview"
      @close-dialog="dialogVisible = false"
      @review-updated="loadReviews"
    />
  </q-page>
</template>

<script setup>
defineOptions({
  name: "IndexPage",
});

import { ref, onMounted } from "vue";
import { useReviewsStore } from "../stores/StoreReviews";

import ReviewCard from "components/ReviewCard.vue";
import ReviewDialog from "components/ReviewDialog.vue";

const username = ref("")
const reviewsList = ref([]);

const filteredReviews = ref([])
const dialogVisible = ref(false);
const selectedReview = ref(null);

const store = useReviewsStore();

onMounted(async () => {
  await loadReviews();
});

const showDialog = (review) => {
  selectedReview.value = review;
  dialogVisible.value = true;
};
const loadFilteredReviews = async () => {
  console.log("hello");
  filteredReviews.value = await store.getFilteredReview(username.value);
  username.value = ""
};
const loadReviews = async () => {
  reviewsList.value = await store.getReviews();
};
</script>
