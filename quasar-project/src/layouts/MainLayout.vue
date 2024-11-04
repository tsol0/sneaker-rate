<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Sneaker Post </q-toolbar-title>
        <q-btn flat @click="logout">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

import signOutUser from "src/firebase/firebase-signout";
import { useRouter } from "vue-router";

const router = useRouter()

const logout = () =>{
  signOutUser().then(() =>{
    router.push('/login')
  })
}

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Home",
    link: "http://localhost:9000/app",
  },
  {
    title: "Sneaker Review Form",
    link: "http://localhost:9000/app/reviewform",
  },
];

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
