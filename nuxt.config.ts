// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  modules: 
    ['@nuxtjs/tailwindcss', '@pinia/nuxt'],


  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET
  }
})
