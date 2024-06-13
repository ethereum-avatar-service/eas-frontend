<script setup lang="ts">

import {QuestionMarkCircleIcon} from "@heroicons/vue/20/solid";
</script>

<template>
  <div>
    <div class="p-4 flex justify-center items-center gap-2">
      <QuestionMarkCircleIcon class="w-5 h-5 text-blue-400" />
      <span class="text-sm text-neutral-400/75">Could not get collection verification status</span>
    </div>
    <div class="p-4 border-2 border-neutral-100 rounded-2xl">
      <p class="text-sm text-neutral-400/75">To combat fraudulent collections, such as copycats, EAS has implemented a collection verification system.</p>
    </div>
  </div>
</template>

<style scoped>

</style>
