<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
    <h1 class="text-3xl font-bold mb-6">Créer ta Room</h1>
    <form @submit.prevent="createRoom" class="max-w-md w-full">
      <div class="mb-4">
        <label for="roomName" class="block text-gray-700">Nom de la room</label>
        <input type="text" id="roomName" v-model="formData.name" required
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">
      </div>

      <button type="submit" class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Créer
      </button>
    </form>

    <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
  </div>
</template>
  
  <script>


  const {useAuthUser} = useAuth()
  const user = useAuthUser()




  export default {
    data() {
      return {
        formData: {
          name: '',
          userId: user.value.id
        },
        errorMessage: '',
        successMessage: ''
      };
    },
    methods: {
      async createRoom () {
        try {
          const response = await fetch('/api/rooms/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.formData)
          });
          const data = await response.json();
          if (response.ok) {
            this.successMessage = 'Création réussi';
            this.$router.push('/');
          } else {
            this.errorMessage = data.message || 'Une erreur est survenue lors de la création';
          }
        } catch (error) {
          console.error('Erreur lors de la création:', error);
          this.errorMessage = 'Une erreur est survenue lors de la création';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .error {
    color: red;
  }
  
  .success {
    color: green;
  }
  </style>
  