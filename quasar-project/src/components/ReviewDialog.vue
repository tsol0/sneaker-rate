<!-- ReviewDialog.vue -->
<template>
  <q-dialog>
    <q-card>
      <q-card-section>
        <q-input v-model="editableReview.sneakername" label="Sneaker Name" />
        <q-item-label caption>by {{ review.username }}</q-item-label>
        <q-input
          v-model="editableReview.review"
          label="Review"
          type="textarea"
        />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" @click="closeDialog" />
        <q-btn
          flat
          label="Delete"
          color="negative"
          @click="removeReview(editableReview.id)"
        />
        <q-btn
          flat
          label="Update"
          color="positive"
          @click="
            updateReview(
              editableReview.id,
              editableReview.rating,
              editableReview.review,
              editableReview.sneakername,
              editableReview.username
            )
          "
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import { useReviewsStore } from "src/stores/StoreReviews";

const props = defineProps({
  review: Object,
  dialogVisible: Boolean,
});

const emit = defineEmits(["close-dialog", "review-updated"]);

const editableReview = ref({ ...props.review });

watch(
  () => props.review,
  (newVal) => {
    editableReview.value = { ...newVal };
  }
);

const closeDialog = () => {
  emit("close-dialog");
};

const store = useReviewsStore();

const removeReview = async (id) => {
  await store.deleteReview(id);
  emit("review-updated");
  closeDialog();
};

const updateReview = async (id, rating, review, sneakername, username) => {
  await store.changeReview(id, rating, review, sneakername, username);
  emit("review-updated");
  closeDialog();
};
</script>
