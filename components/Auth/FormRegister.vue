<template>
    <div>
        <div class="pt-5 space-y-6 ">
            <UIInput label="Username" placeholder="@username" v-model="data.username"/>
            <UIInput label="Email" placeholder="example@example.com" v-model="data.email"/>
            <UIInput label="Password" placeholder="********" type="password" v-model="data.password"/>
            <UIInput label="Full Name" placeholder="John Doe" v-model="data.name"/>
            <div>
                <button @click="handleRegister">Register</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';

const data = reactive({
    username: '',
    email: '',
    password: '',
    name: '',
    loading: false
});

const handleRegister = async () => {
    data.loading = true;
    try {
        const responseData = await register(data.username, data.email, data.password, data.name);
        console.log('Registration successful:', responseData);
        // Gérer la réussite de l'inscription (redirection, affichage de message, etc.)
    } catch (error) {
        console.error('Registration error:', error);
        // Gérer les erreurs (affichage de message d'erreur, etc.)
    } finally {
        data.loading = false;
    }
}
</script>
