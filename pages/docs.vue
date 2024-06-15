<template>
  <div class="py-8 lg:py-16">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="flex flex-col gap-6">
        <h1 class="font-medium text-2xl">Usage</h1>
        <div class="flex flex-col gap-6">
          <h2 class="font-medium text-xl">How to implement EAS into my platform</h2>
          <p>It is recommended to use the official EAS API, as the response will also contain information about the NFT's collection.</p>
          <div class="flex flex-col gap-6">
            <div class="flex flex-col gap-3">
              <h2 class="font-medium text-lg">Option 1 (Recommended). Use the official EAS API</h2>
              <p>Simply make a GET request to <a href="https://api.eas.tools/avatar/0x91537C44fF0fE61E8142976A94a3295E17Db82F3" target="_blank" class="text-sky-500">api.eas.tools/avatar/{address}</a> with the address set to the wallet address you would like to know the avatar info from.</p>
            </div>
            <div class="flex flex-col gap-3">
              <h2 class="font-medium text-lg">Option 2. Manually query the smart contract</h2>
              <p>1. Query the smart contract using the "getAvatarInfo" function. Please see the <a href="https://github.com/ethereum-avatar-service/eas-frontend/blob/master/composables/useAvatarService.ts#L34" target="_blank" class="text-sky-500">frontend repository</a> for an example implementation.</p>
              <p>2. Fetch the avatar metadata from IPFS using the "uri" returned in the previous step.</p>
              <p>3. The metadata should contain an "image" field. Use this link to display the avatar image.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <h1 class="font-medium text-2xl">Contracts</h1>
        <span class="truncate">Ethereum: <a href="https://etherscan.io/address/0x9AfDC4097DCDc49Aac58D4aaEa353B3a8ec60F1d" target="_blank" class="text-sky-500">0x9AfDC4097DCDc49Aac58D4aaEa353B3a8ec60F1d</a></span>
        <span class="truncate">Polygon: <a href="https://polygonscan.com/address/0xd9517Fa5223322e1bD731af127A7C51fd34c2222" target="_blank" class="text-sky-500">0xd9517Fa5223322e1bD731af127A7C51fd34c2222</a></span>
        <span class="truncate">Sepolia: <a href="https://sepolia.etherscan.io/address/0xdCD59d96454D585B12Ef167c15c43D0BFF96DC3F" target="_blank" class="text-sky-500">0xdCD59d96454D585B12Ef167c15c43D0BFF96DC3F</a></span>
      </div>
      <div class="flex flex-col gap-3">
        <h1 class="font-medium text-2xl">API</h1>
        <a href="https://api.eas.tools/whitelist" target="_blank" class="text-sky-500">api.eas.tools/whitelist</a>
        <a href="https://api.eas.tools/avatar/0x91537C44fF0fE61E8142976A94a3295E17Db82F3" target="_blank" class="text-sky-500">api.eas.tools/avatar/{address}</a>
      </div>
      <div class="flex flex-col gap-3">
        <h1 class="font-medium text-2xl">GitHub</h1>
        <a href="https://github.com/orgs/ethereum-avatar-service" target="_blank" class="text-sky-500">github.com/orgs/ethereum-avatar-service</a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
<script setup lang="ts">
</script>
