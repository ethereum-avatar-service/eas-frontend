<template>
  <div class="group relative">
    <div class="hex w-72 h-72 flex items-center bg-sky-500">
      <template v-if="src">
        <img :src="src" class="object-cover" alt="Avatar" />
      </template>
    </div>
    <div class="tooltip max-w-96 absolute mt-2 left-1/2 transform -translate-x-1/2 hidden group-hover:flex bg-neutral-50 border border-neutral-100 shadow-lg shadow-neutral-100 rounded-2xl duration-300">
      <div class="w-full p-4 flex flex-col gap-2 text-sm">
        <div class="flex items-center gap-2">
          <span class="text-neutral-400/75">Network:</span>
          <span class="capitalize truncate">{{ avatarNetwork }}</span>
        </div>
        <hr class="h-[2px] bg-neutral-100 border-0">
        <div class="flex items-center gap-2">
          <span class="text-neutral-400/75">Contract:</span>
          <span class="truncate">{{ avatarInfo?.avatar?.tokenAddress }}</span>
        </div>
        <hr class="h-[2px] bg-neutral-100 border-0">
        <div class="flex items-center gap-2">
          <span class="text-neutral-400/75">Owned:</span>
          <span class="truncate" :class="avatarInfo?.owned ? 'text-green-500' : 'text-red-500'">{{ !!avatarInfo?.owned }}</span>
        </div>
        <hr class="h-[2px] bg-neutral-100 border-0">
        <div class="flex items-center gap-2">
          <span class="text-neutral-400/75">Collection:</span>
          <div class="flex items-center overflow-hidden">
            <span class="truncate">{{ avatarMetadata?.collection?.name }}</span>
            <template v-if="avatarMetadata?.collection?.verified">
              <CheckBadgeIcon class="w-5 h-5 text-green-400" />
            </template>
            <template v-else>
              <XMarkIcon class="w-5 h-5 text-red-400" />
            </template>
          </div>
        </div>
        <hr class="h-[2px] bg-neutral-100 border-0">
        <div class="flex items-center gap-2">
          <span class="text-neutral-400/75">Author:</span>
          <span class="truncate">{{ avatarMetadata?.collection?.author }}</span>
        </div>
        <hr class="h-[2px] bg-neutral-100 border-0">
        <div class="flex items-center gap-2">
          <span class="text-neutral-400/75">Website:</span>
          <a :href="avatarMetadata?.collection?.website" class="truncate text-sky-500">{{ avatarMetadata?.collection?.website.replace("https://", "") }}</a>
        </div>
        <hr class="h-[2px] bg-neutral-100 border-0">
        <div class="flex items-center gap-2">
          <span class="text-neutral-400/75">Opensea:</span>
          <a :href="avatarMetadata?.collection?.opensea" class="truncate text-sky-500">{{ avatarMetadata?.collection?.opensea.replace("https://", "") }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {CheckBadgeIcon, XMarkIcon} from "@heroicons/vue/16/solid";

const props = defineProps({
  src: String,
  avatarNetwork: String,
  avatarInfo: Object,
  avatarMetadata: Object
});
</script>

<style scoped>
.hex {
  clip-path: polygon(45% 1.33975%, 46.5798% 0.60307%, 48.26352% 0.15192%, 50% 0%, 51.73648% 0.15192%, 53.4202% 0.60307%, 55% 1.33975%, 89.64102% 21.33975%, 91.06889% 22.33956%, 92.30146% 23.57212%, 93.30127% 25%, 94.03794% 26.5798%, 94.48909% 28.26352%, 94.64102% 30%, 94.64102% 70%, 94.48909% 71.73648%, 94.03794% 73.4202%, 93.30127% 75%, 92.30146% 76.42788%, 91.06889% 77.66044%, 89.64102% 78.66025%, 55% 98.66025%, 53.4202% 99.39693%, 51.73648% 99.84808%, 50% 100%, 48.26352% 99.84808%, 46.5798% 99.39693%, 45% 98.66025%, 10.35898% 78.66025%, 8.93111% 77.66044%, 7.69854% 76.42788%, 6.69873% 75%, 5.96206% 73.4202%, 5.51091% 71.73648%, 5.35898% 70%, 5.35898% 30%, 5.51091% 28.26352%, 5.96206% 26.5798%, 6.69873% 25%, 7.69854% 23.57212%, 8.93111% 22.33956%, 10.35898% 21.33975%);
}

.tooltip {
  @apply before:w-4 before:h-4 before:rotate-45 before:bg-neutral-50 before:absolute before:z-[1] before:-top-[8.5px] before:left-0 before:right-0 before:mx-auto before:border-l before:border-t before:border-neutral-100;
}
</style>
