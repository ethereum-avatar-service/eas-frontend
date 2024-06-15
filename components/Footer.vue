<template>
  <footer>
    <div class="px-4 md:px-9 py-5 w-full text-neutral-400 border-t border-neutral-100">
      <div class="flex flex-col md:flex-row gap-6 text-sm">
        <a href="https://dutchbits.nl" target="_blank">
          <Dutchbits class="h-9 w-auto text-neutral-400 hover:text-[#F66003] fill-neutral-400 hover:fill-black duration-300" />
        </a>
      </div>
    </div>
    <div class="px-4 md:px-9 py-3 w-full text-neutral-400 border-t border-neutral-100">
      <div class="flex flex-col md:flex-row justify-between gap-6 text-sm">
        <span>Donate: 0xB0753614730408d91Ccc46c1f4210efF0bee648B</span>
        <a href="https://github.com/ethereum-avatar-service" target="_blank">GitHub</a>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
import Dutchbits from "~/components/sponsors/dutchbits.vue";
</script>
