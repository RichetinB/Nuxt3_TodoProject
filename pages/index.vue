<template>
  <div :class="{ 'dark': darkMode }">
    <LoadingPage v-if="isAuthLoading" />

    <!-- APP -->
    <div v-else-if="user" class="min-h-screen flex flex-col justify-center items-center">
      <!-- Header -->
      <header class="bg-blue-500 text-white py-4 px-6 text-center w-full">
        <h1 class="text-xl font-semibold font-righteous-regular">TodoPierro</h1>
      </header>

      <!-- Main content -->
      <main class="flex-grow p-6">
        <div class="max-w-xl mx-auto">
          <MainSection title="Home" :loading="loading">
            {{ user.username }}
          </MainSection>

          <button @click="handleUserLogout" class="bg-red-500 text-white px-4 py-2 rounded-md mt-4">Déconnexion</button>

          <router-link to="/room/CreateRoom" class="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Créer une room</router-link>

          <router-link to="/account" class="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">Voir Compte</router-link>

          <div>
            <h2 class="text-lg font-semibold mt-8">Mes Salles</h2>
            <li v-for="room in rooms" :key="room.id" class="py-2">
              <nuxt-link :to="`/room/${room.id}`">{{ room.name }}</nuxt-link>
            </li>
          </div>
        </div>
      </main>
    </div>

    <AuthPage v-else/>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { ref, onBeforeMount } from 'vue'

const darkMode = ref(false)
const { useAuthUser, initAuth, useAuthLoading, logout, useAuthRoom } = useAuth()
const user = useAuthUser()

const isAuthLoading = useAuthLoading()
const router = useRouter()
const rooms = useAuthRoom()

onBeforeMount(() => {
  initAuth()
})

function handleUserLogout() {
    logout()
}
</script>

<style>
.font-righteous-regular {
  font-family: "Righteous", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
