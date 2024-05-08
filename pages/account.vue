<template>
    <div class="max-w-lg mx-auto p-6">
      <router-link to="/" class="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 inline-block">Home</router-link>
      <h1 class="text-3xl font-bold mb-6">Compte utilisateur</h1>
      
      <div class="mb-4">
        <p class="mb-2">Nom d'utilisateur : {{ user ? user.name : '-' }}</p>
        <p class="mb-2">Email : {{ user ? user.email : '-' }}</p>
        <!-- <input v-model="editedUser.name" type="text" placeholder="Nouveau nom d'utilisateur"
               class="mt-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"> -->
      </div>
    <div>
      <form @submit.prevent="userChange" class="max-w-md w-full">
      <div class="mb-4">

        <label for="userName" class="block text-gray-700">Modifier votre name</label>
        <input type="text" id="userName" v-model="formData.name" 
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">


        <label for="userEmail" class="block text-gray-700">Modifier votre EMAIL</label>
        <input type="text" id="userEmail" v-model="formData.email" 
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">


        <label for="userUsername" class="block text-gray-700">Modifier votre username</label>
        <input type="text" id="userUsername" v-model="formData.username" 
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">


        <label for="userPassword" class="block text-gray-700">Modifier votre Mot de passe</label>
        <input type="text" id="userPassword" v-model="formData.password" 
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"> 


      </div>

      <button type="submit" class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Modifier
      </button>
    </form>

    <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
  </div>
    </div>
</template>
  
<script setup>
// import { ref, onBeforeMount } from 'vue';

const { putUser, useAuthUser, initAuth } = useAuth(); 





onBeforeMount(() => {
    initAuth()
});


</script>

<script>
const { putUser, useAuthUser, initAuth } = useAuth(); 
const user = useAuthUser();

const getUser = user

export default {
    data() {
      return {
        formData: {
          id: user.value.id,
          name: user.value.name,
          email: user.value.email,
          username: user.value.username,
          password: ''
          
        },
        errorMessage: '',
        successMessage: ''
      };
    },
    methods: {
      async userChange () {
        try {
          const response = await $fetch('/api/user/userChange', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formData)

            
          });

          await initAuth()

        } catch (error) {
          console.error('Erreur lors de la création:', error);
          this.errorMessage = 'Une erreur est survenue lors de la création';
        }
      }
    }
  };</script>
