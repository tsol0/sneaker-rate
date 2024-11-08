<!-- ReviewCard.vue -->
<template>
  <q-card @click="openDialog" class="full-width-card">
    <q-card-section>
      <q-item-label>{{ review.sneakername }}</q-item-label>
      <q-item-label caption>by {{ review.username }}</q-item-label>
      <q-img :src="url" alt="" :ratio="12/1"/>
      <!-- <q-img :src="url" alt=""/>
      <q-img :src="url" alt=""/> -->
      <q-item-label>{{ review.review }}</q-item-label>
      <q-item-label>{{ review.rating }}/5</q-item-label>
      <!-- <RatingComponent :rating="review.rating"/> -->
       <!-- <q-rating v-model="rating" @ /> -->
    </q-card-section>
  </q-card>
</template>

<script setup>
import { userImageDownload } from 'src/firebase/firebase-storage-download';
import { ref } from 'vue';


const url = ref("https://picsum.photos/500/300")
const props = defineProps({
  review: Object
})

// const username =

async function getImage() {
  const url = await userImageDownload(props.review.username, props.review.id)
 console.log(url)
 return url
}

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
