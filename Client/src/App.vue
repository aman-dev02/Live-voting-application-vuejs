<script setup>
import {  RouterView } from 'vue-router'
import { ref, onMounted } from 'vue';
import preLoader from './components/preLoader.vue';
import Navbar from './components/Navbar.vue';
import 'vue3-toastify/dist/index.css';
import { toast } from 'vue3-toastify'
const isLoading = ref(true);


onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  },1500);
});
</script>

<template>
  <preLoader v-if="isLoading" />
  <Navbar/>
  <RouterView/>
</template>

<style scoped>

</style>
