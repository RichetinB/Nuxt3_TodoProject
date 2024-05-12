import { Link } from "#build/components";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default ({

  
  modules: 
    ['@nuxtjs/tailwindcss', '@nuxtjs/google-fonts'],

    googleFonts: {
      useStylesheet: true
    },


  runtimeConfig: {
    jwtAccessSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_TOKEN_SECRET
  },

})