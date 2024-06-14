<template>
  <div class="text-[0.95rem] min-h-screen flex flex-col">
    <Navbar />
    <div class="px-4 md:px-9 pt-[72px] flex-grow">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from "~/components/Navbar.vue";
import Footer from "~/components/Footer.vue";

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
