<script setup lang="ts">
import {ChevronDownIcon} from "@heroicons/vue/20/solid";
</script>

<template>
  <div class="relative w-full">
    <div class="mx-auto">
      <div class="flex flex-col items-center">
        <p class="text-lg md:text-xl">Frequenty asked questions</p>
      </div>
      <div class="mx-auto mt-8 flex flex-col gap-2">
        <div class="p-4 bg-neutral-100 rounded-2xl">
          <details class="group">
            <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
              <span>Why EAS?</span>
              <ChevronDownIcon class="w-6 text-neutral-300 group-open:rotate-180 duration-300" />
            </summary>
            <p class="group-open:animate-fadeIn mt-3 text-neutral-600">
              To allow people to express themselves on Web3 using their NFTs. Until now, each platform has used its own custom method for displaying avatars linked to wallet addresses. EAS introduces a universal protocol that simplifies this process for everyone. Additionally, EAS offers a collection verification system to combat fake and copycat NFT collections.
            </p>
          </details>
        </div>
        <div class="p-4 bg-neutral-100 rounded-2xl">
          <details class="group">
            <summary class="flex cursor-pointer list-none items-center justify-between font-medium">
              <span>Is it safe to use?</span>
              <ChevronDownIcon class="w-6 text-neutral-300 group-open:rotate-180 duration-300" />
            </summary>
            <p class="group-open:animate-fadeIn mt-3 text-neutral-600">
              EAS uses a very simple smart contract that doesn't need any permissions or other wizardry. The whole project is open-source, you can verify it yourself on <a href="https://github.com/orgs/ethereum-avatar-service/repositories" target="_blank" class="text-sky-500">GitHub</a> and on chain.
            </p>
          </details>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
