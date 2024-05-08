<template>
  <div class="max-w-md mx-auto p-6">
    <h1 class="text-3xl font-bold mb-6">Inscription</h1>
    <form @submit.prevent="registerUser" class="space-y-4">
      <div>
        <label for="username" class="block text-sm font-medium text-gray-700">Nom d'utilisateur</label>
        <input id="username" type="text" v-model="formData.username" required
               class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">
      </div>

      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input id="email" type="email" v-model="formData.email" required
               class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
        <input id="password" type="password" v-model="formData.password" required
               class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">
      </div>

      <div>
        <label for="repeat-password" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
        <input id="repeat-password" type="password" v-model="formData.repeatPassword" required
               class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">
      </div>

      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
        <input id="name" type="text" v-model="formData.name" required
               class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50">
      </div>

      <button type="submit" class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        S'inscrire
      </button>
    </form>
    <p v-if="errorMessage" class="text-red-600 mt-4">{{ errorMessage }}</p>
    <p v-if="successMessage" class="text-green-600 mt-4">{{ successMessage }}</p>
  </div>
</template>


<script>
export default {
  data() {
    return {
      formData: {
        username: '',
        email: '',
        password: '',
        repeatPassword: '',
        name: ''
      },
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await fetch('/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        });
        const data = await response.json();
        if (response.ok) {
          this.successMessage = 'Inscription réussie !';
          this.$router.push('/');
        } else {
          this.errorMessage = data.message || 'Une erreur est survenue lors de l\'inscription';
        }
      } catch (error) {
        console.error('Erreur lors de l\'inscription:', error);
        this.errorMessage = 'Une erreur est survenue lors de l\'inscription';
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
