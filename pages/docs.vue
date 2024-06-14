<script setup lang="ts">
import {zeroAddress} from "viem";
</script>

<template>
  <div class="py-8 lg:py-16">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="flex flex-col gap-3">
        <h1 class="font-medium text-2xl">Documentation</h1>
        <p>Work in progress..</p>
      </div>
      <div class="flex flex-col gap-3">
        <h1 class="font-medium text-2xl">Contracts</h1>
        <span>Ethereum: <span class="italic">Pending</span></span>
        <span>Sepolia: <a href="https://sepolia.etherscan.io/address/0xdCD59d96454D585B12Ef167c15c43D0BFF96DC3F" target="_blank" class="text-sky-500">0xdCD59d96454D585B12Ef167c15c43D0BFF96DC3F</a></span>
        <span>Polygon: <a href="https://polygonscan.com/address/0xd9517Fa5223322e1bD731af127A7C51fd34c2222" target="_blank" class="text-sky-500">0xd9517Fa5223322e1bD731af127A7C51fd34c2222</a></span>
      </div>
      <div class="flex flex-col gap-3">
        <h1 class="font-medium text-2xl">API</h1>
        <a href="https://api.eas.tools/whitelist" target="_blank" class="text-sky-500">api.eas.tools/whitelist</a>
        <a :href="`https://api.eas.tools/avatar/${zeroAddress}`" target="_blank" class="text-sky-500">api.eas.tools/avatar/{address}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
