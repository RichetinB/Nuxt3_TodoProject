<template>
    <div>
      <h1>Je suis La page Room numéro {{ roomId }}</h1>
    </div>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const roomId = route.params.id;
  </script>
s  