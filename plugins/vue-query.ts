import { QueryClient, VueQueryPlugin } from "@tanstack/vue-query";

// Nuxt 3 app aliases
import { defineNuxtPlugin } from "#imports";

const queryClient = new QueryClient();

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(VueQueryPlugin, { queryClient })
})
