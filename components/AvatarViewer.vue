<template>
  <template v-if="avatarInfo && !isLoading">
    <div class="flex flex-col items-center">
      <div class="relative">
        <Avatar :src="imageLink" :avatar-network="avatarNetwork" :avatar-info="avatarInfo" :avatar-metadata="avatarMetadata" />
      </div>
      <div class="mt-16 flex flex-col gap-2 text-center w-full">
        <label class="px-2 text-sm text-neutral-400/75">Token Address</label>
        <div class="p-4 bg-neutral-100 text-neutral-400/75 rounded-2xl truncate">{{ avatarInfo.avatar?.tokenAddress }}</div>
        <label class="mt-2 px-2 text-sm text-neutral-400/75">Token ID</label>
        <div class="p-4 bg-neutral-100 text-neutral-400/75 rounded-2xl truncate">{{ avatarInfo.avatar?.tokenId }}</div>
        <template v-if="avatarInfo.avatar?.tokenAddress !== zeroAddress">
          <div class="p-4 rounded-2xl truncate" :class="{ 'bg-green-100 text-green-500': avatarInfo.owned, 'bg-red-100 text-red-500': !avatarInfo.owned }">{{ avatarInfo.owned ? "Owned" : "Not owned" }}</div>
        </template>
        <template v-if="avatarMetadata?.collection?.verified">
          <VerifiedNotice />
        </template>
        <template v-else-if="avatarMetadata && avatarInfo.avatar?.tokenAddress !== zeroAddress">
          <UnverifiedNotice />
        </template>
        <template v-else-if="avatarInfo.avatar?.tokenAddress !== zeroAddress">
          <UnknownNotice />
        </template>
        <template v-if="avatarMetadata?.collection?.name">
          <label class="p-4 text-sm text-neutral-400/75">Collection</label>
          <div class="p-4 flex flex-col gap-2 text-sm border-2 border-neutral-100 rounded-2xl truncate">
            <div class="flex items-center gap-2">
              <span class="text-neutral-400/75">Name:</span>
              <span class="truncate">{{ avatarMetadata?.collection?.name }}</span>
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
        </template>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="flex justify-center w-full">
      <svg class="w-10 h-10 animate-spin text-blue-500/50 fill-blue-500" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
    </div>
  </template>
</template>

<script setup>
import {zeroAddress} from "viem";
import VerifiedNotice from "~/components/collection/VerifiedNotice.vue";
import UnverifiedNotice from "~/components/collection/UnverifiedNotice.vue";
import UnknownNotice from "~/components/collection/UnknownNotice.vue";
import Avatar from "~/components/Avatar.vue";

const props = defineProps({
  avatarNetwork: String,
  avatarInfo: Object,
  avatarMetadata: Object,
  imageLink: String,
  isLoading: Boolean
});
</script>

<style scoped>

</style>
