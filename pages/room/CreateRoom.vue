<template>
    <div>
      <h1>Inscription</h1>
      <form @submit.prevent="createRoom">
        <label>Nom de la room</label>
        <input type="text" v-model="formData.name" required>
        
        <button type="submit">Créer</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
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
  