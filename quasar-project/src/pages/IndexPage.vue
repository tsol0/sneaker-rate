<template>
  <q-page padding>
    <q-list>
      <q-item v-for="review in reviewsList" :key="review.id" clickable>
        <div v-if="false">
          <img src="" alt="hello">
        </div>
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


const reviewsList = ref([]);
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

const loadReviews = async () => {
  reviewsList.value = await store.getReviews();
};
</script>
