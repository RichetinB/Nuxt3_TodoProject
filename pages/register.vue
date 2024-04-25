<template>
  <div>
    <h1>Inscription</h1>
    <form @submit.prevent="registerUser">
      <label>Nom d'utilisateur</label>
      <input type="text" v-model="formData.username" required>
      
      <label>Email</label>
      <input type="email" v-model="formData.email" required>
      
      <label>Mot de passe</label>
      <input type="password" v-model="formData.password" required>
      
      <label>Confirmer le mot de passe</label>
      <input type="password" v-model="formData.repeatPassword" required>
      
      <label>Nom</label>
      <input type="text" v-model="formData.name" required>
      
      <button type="submit">S'inscrire</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    <p v-if="successMessage" class="success">{{ successMessage }}</p>
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
