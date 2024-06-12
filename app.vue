<template>
  <div class="px-4 text-[0.95rem]">
    <Navbar />
    <div class="pt-[72px]">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";

useHead({
  bodyAttrs: {
    class: "open-sans bg-neutral-50 text-neutral-950",
  },
});
</script>
