<template>
    <div>
        <div class="pt-5 space-y-6 ">

            <UIInput label="Username" placeholder="@username" v-model="data.username"/>

            <UIInput label="Password" placeholder="********" type="password" v-model="data.password"/>

            <div>
                <button @click="handleLogin">Login</button>
            </div>

            <div>
                <NuxtLink to="/register">
                    Register
                </NuxtLink>
            </div>

        </div>
    </div>
</template>

<script setup>

const data = reactive({
    password: '',
    username: '',
    loading: false
})


async function  handleLogin() {
    const {login} = useAuth()

    data.loading = true
    try {
        await login(data.username, data.password);
    } catch (error) {
        console.log(error)
    } finally {
        data.loading = false
    }
}


</script>