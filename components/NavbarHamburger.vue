<template>
  <div v-click-outside="() => isSelecting = false" class="">
    <div @click="isSelecting = !isSelecting" class="px-2 h-10 flex justify-center items-center gap-1 text-neutral-200 hover:text-neutral-300 rounded-2xl cursor-pointer duration-300" :class="{ 'text-neutral-300': isSelecting }">
      <Bars3Icon class="w-8 h-8" />
    </div>
    <transition name="slide-top">
      <template v-if="isSelecting">
        <div class="absolute mt-2 p-2 left-4 right-4 flex flex-col bg-neutral-50 border border-neutral-100 shadow-lg shadow-neutral-100 rounded-2xl duration-300">
          <NuxtLink replace to="/" class="link" active-class="link-active">My avatar</NuxtLink>
          <NuxtLink replace to="/lookup" class="link" active-class="link-active" :class="{ 'link-active': route.path.includes('/lookup') }">Lookup</NuxtLink>
          <NuxtLink replace to="/whitelist" class="link" active-class="link-active">Verified collections</NuxtLink>
          <NuxtLink replace to="/docs" class="link" active-class="link-active">Docs</NuxtLink>
        </div>
      </template>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {Bars3Icon} from "@heroicons/vue/20/solid";

const route = useRoute();

const isSelecting = ref(false);
</script>

<style scoped>
.link {
  @apply px-3 h-10 flex items-center hover:bg-neutral-100 text-neutral-400 rounded-2xl cursor-pointer duration-300;
}

.link-active {
  @apply text-neutral-950;
}
</style>
