<script setup lang="ts">
import {zeroAddress} from "viem";
</script>

<template>
  <div class="py-16">
    <div class="max-w-7xl mx-auto flex flex-col gap-12">
      <div class="flex flex-col gap-3">
        <h1 class="font-medium text-2xl">Documentation</h1>
        <p>Work in progress..</p>
      </div>
      <div class="flex flex-col gap-3">
        <h1 class="font-medium text-2xl">API</h1>
        <p>Work in progress..</p>
        <a href="https://api.eas.tools/whitelist" target="_blank" class="text-sky-500">api.eas.tools/whitelist</a>
        <a :href="`https://api.eas.tools/avatar/${zeroAddress}`" target="_blank" class="text-sky-500">api.eas.tools/avatar/{address}</a>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
