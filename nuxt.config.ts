// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  target: "static",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      EAS_API: process.env.NUXT_PUBLIC_EAS_API ?? "https://api.eas.tools"
    }
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
