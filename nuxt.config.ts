// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  target: "static",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      easApi: "https://api.eas.tools",
    }
  },
  css: ["~/assets/css/main.css"],
  modules: ['@nuxtjs/tailwindcss'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
