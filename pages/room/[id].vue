<template>
    <div>
      <h1>Je suis la page de la chambre numéro {{ roomId }}</h1>
      <h2 v-if="rooms.length === 0">Aucune chambre trouvée.</h2>
      <h2 v-else >{{ rooms.name }}</h2>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const roomId = route.params.id;
  const rooms = ref([]);
  
  onMounted(async () => {
  try {
    rooms.value = await getRoom(roomId);

    console.log("rooms.value", rooms.value.name)
  } catch (error) {
    console.error('Error fetching room:', error);
  }
});
  

  
  async function getRoom(id) {
     return await $fetch(`/api/rooms/${id}`);
    
  }
  </script>
  