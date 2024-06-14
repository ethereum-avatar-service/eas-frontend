<template>
  <div class="py-16">
    <div class="px-4 mx-auto flex flex-col gap-12">
      <div class="flex flex-col gap-3">
        <h1 class="font-medium text-2xl">Submit collection for verification</h1>
        <p>Please read <a href="https://github.com/ethereum-avatar-service/eas-api-whitelist/blob/main/README.md" target="_blank" class="text-sky-500">here</a> on how to get a collection verified.</p>
      </div>
      <hr class="h-[2px] bg-neutral-100 border-0">
      <template v-if="whitelist">
        <template v-for="(collections, network) in whitelist">
          <h1 class="px-5 font-medium text-2xl">{{ network }}</h1>
          <div class="border-2 border-neutral-100 rounded-2xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="table-auto w-full text-sm text-nowrap text-left">
                <thead class="text-neutral-400">
                <tr class="bg-neutral-100">
                  <th class="font-normal px-6 py-3">Name</th>
                  <th class="font-normal px-6 py-3">Contract</th>
                  <th class="font-normal px-6 py-3">Verified</th>
                </tr>
                </thead>
                <tbody>
                <template v-for="(collection, contract) in collections">
                  <tr>
                    <td class="px-6 py-4"><a :href="collection.opensea" class="text-sky-500">{{ collection.name }}</a></td>
                    <td class="px-6 py-4">{{ contract }}</td>
                    <td class="px-6 py-4" :class="{ 'text-green-500': collection.verified, 'text-red-500': !collection.verified }">{{ collection.verified }}</td>
                  </tr>
                </template>
                </tbody>
              </table>
            </div>
          </div>
        </template>
      </template>
      <template v-else>
        <p>Could not load collection whitelist.</p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const {getWhitelist} = useAvatarServiceApi();

const whitelist = ref(null);

onMounted(async () => {
  try {
    whitelist.value = await getWhitelist();
  } catch (err) {
    console.error(err);
  }
});
</script>

<style scoped>

</style>
