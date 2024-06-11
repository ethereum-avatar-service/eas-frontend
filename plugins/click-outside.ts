import vClickOutside from "click-outside-vue3";

import { defineNuxtPlugin } from "#imports";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(vClickOutside);
});
