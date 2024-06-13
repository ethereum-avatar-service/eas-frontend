<template>
  <header class="p-5 h-[72px] fixed w-full bg-neutral-50 border-b border-neutral-100">
    <div class="h-full flex items-center">
      <div class="hidden md:flex items-center gap-8">
        <h1 class="font-bold text-xl text-sky-500">ethereum avatar service</h1>
        <div class="flex items-center gap-2">
          <NuxtLink to="/" class="link" active-class="link-active">My avatar</NuxtLink>
          <NuxtLink to="whitelist" class="link">Verified collections</NuxtLink>
          <NuxtLink class="link">Docs</NuxtLink>
        </div>
      </div>
      <h1 class="md:hidden font-bold text-2xl text-blue-400">eas</h1>
      <div class="ml-auto px-2 flex items-center gap-1">
        <template v-if="isConnected && address">
          <ChainSwitcher />
          <div class="px-3 h-8 flex justify-center items-center rounded-full duration-300">{{ `${address.slice(0, 6)}...${address.slice(38, 42)}` }}</div>
          <button @click="disconnect" class="group px-2 h-8 flex justify-center gap-2 items-center hover:bg-red-100 text-red-400 hover:text-red-500 duration-300 rounded-full">
            <PowerIcon class="w-5 h-5" />
            <span class="pr-1 hidden group-hover:block overflow-hidden">Disconnect</span>
          </button>
        </template>
        <template v-else>
          <button @click="connect({ connector: injected() });" class="px-3 h-10 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-full duration-300">Connect</button>
        </template>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import ChainSwitcher from "~/components/ChainSwitcher.vue";
import {PowerIcon} from "@heroicons/vue/16/solid";
import {useAccount, useConnect, useDisconnect} from "@wagmi/vue";
import {injected} from "@wagmi/vue/connectors";

const { connect } = useConnect();
const { disconnect } = useDisconnect();
const { address, isConnected } = useAccount();
</script>

<style scoped>
.link {
  @apply px-3 h-10 flex items-center hover:bg-neutral-100 text-neutral-400 rounded-2xl cursor-pointer duration-300;
}

.link-active {
  @apply text-neutral-950;
}
</style>
