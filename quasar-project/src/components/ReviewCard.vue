<!-- ReviewCard.vue -->
<template>
  <q-card @click="openDialog" class="full-width-card">
    <q-card-section>
      <q-item-label>{{ review.sneakername }}</q-item-label>
      <q-item-label caption>by {{ review.username }}</q-item-label>
      <q-item-label>{{ review.review }}</q-item-label>
      <q-item-label>{{ review.rating }}/5</q-item-label>
      <!-- <RatingComponent :rating="review.rating"/> -->
       <!-- <q-rating v-model="rating" @ /> -->
    </q-card-section>
  </q-card>
</template>

<script setup>
// import { ref, inject } from "vue"
// import  RatingComponent  from "components/RatingComponent.vue";

// const rating = ref(2)

const props = defineProps({
  review: Object
})


const emit = defineEmits(["open-dialog"])

const openDialog = () => {
  emit("open-dialog", props.review);
}
</script>

<style scoped>
.full-width-card {
  width: 100%;
}
</style>
