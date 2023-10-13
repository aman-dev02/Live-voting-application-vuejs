<template>
    <div class="loader-container">
      <atom-spinner :animation-duration="1000" :size="60" color="#3F72AF" />
    </div>
  </template>
  
  <script setup>
import { AtomSpinner } from 'epic-spinners'
  </script>
  
  <style scoped>
  .loader-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7); /* Add a semi-transparent background */
    z-index: 9999; /* Ensure the loader is on top of other elements */
  }
  </style>
  