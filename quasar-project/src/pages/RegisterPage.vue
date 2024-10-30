<template>
  <q-page padding>
    <q-form @submit="register">
      <q-input v-model="email" label="Email" outlined />
      <q-input v-model="password" label="Password" type="password" outlined />
      <q-btn type="submit" label="Register" color="primary" />
    </q-form>
    <p v-if="error">{{ error }}</p>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

// const auth = getAuth();

const email = ref('');
const password = ref('');
const error = ref(null);

const register = async () => {
  try {
    console.log("This worked"+ email.value + password.value);
    // const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
    // console.log('User registered:', userCredential.user);
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<style scoped>
/* Add your styles here */
</style>

