<template>
    <div class="max-w-lg mx-auto p-6">
      <router-link to="/" class="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 inline-block">Home</router-link>
      <h1 class="text-3xl font-bold mb-6">Compte utilisateur</h1>
      
      <div class="mb-4">
        <p class="mb-2">Nom d'utilisateur : {{ user ? user.name : '-' }}</p>
        <p class="mb-2">Email : {{ user ? user.email : '-' }}</p>
        <input v-model="editedUser.name" type="text" placeholder="Nouveau nom d'utilisateur"
               class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">
      </div>
  
      <button @click="editUser" class="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Edit
      </button>
    </div>
  </template>
  
<script setup>
import { ref, onBeforeMount } from 'vue';



const { putUser, useAuthUser, initAuth } = useAuth(); 
const user = useAuthUser();
const editedUser = ref({
    name: user.value ? user.value.name : null
});

onBeforeMount(() => {
    initAuth()
});

async function editUser() {
    try {
        if (editedUser.value.name) {
            const updatedUser = await putUser({
                name: editedUser.value.name,
            });
            console.log('Utilisateur mis à jour avec succès :', updatedUser);
        } else {
            console.error('Nom manquant pour mettre à jour l\'utilisateur');
        }
    } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
    }
}
</script>
