import { WagmiPlugin } from "@wagmi/vue";
import { config } from "~/config";

// Nuxt 3 app aliases
import { defineNuxtPlugin } from "#imports"

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.use(WagmiPlugin, { config })
})
