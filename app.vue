<template>
  <div class="text-[0.95rem]">
    <Navbar />
    <div class="px-4 md:px-9 pt-[72px]">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";

useHead({
  title: "Ethereum Avatar Service",
  link: [
    { rel: "icon", type: "image/png", href: "/favicon.png" }
  ],
  bodyAttrs: {
    class: "open-sans bg-neutral-50 text-neutral-950",
  },
});
</script>
