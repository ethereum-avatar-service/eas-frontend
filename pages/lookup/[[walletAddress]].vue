<template>
  <div class="py-8 lg:py-16">
    <div class="max-w-lg mx-auto flex flex-col gap-12">
      <div class="flex justify-center items-center gap-3">
        <h1 class="font-medium text-center text-2xl">Lookup avatar on</h1>
        <select class="select" v-model="selectedChain">
          <template v-for="chain in chains">
            <option :value="chain">{{ chain.name }}</option>
          </template>
        </select>
      </div>
      <div class="flex gap-2">
        <input class="input" type="text" placeholder="Search on address.." v-model="walletAddress">
        <button :disabled="!isSearchValid" @click="search" class="px-6 h-14 flex gap-2 flex-nowrap justify-center items-center bg-blue-500/20 hover:bg-blue-500/25 disabled:bg-neutral-100 font-medium text-blue-500 disabled:text-neutral-400/75 rounded-2xl duration-300">Go</button>
      </div>
      <template v-if="fetchedWalletAddress">
        <AvatarViewer :avatar-info="avatarInfo" :avatar-metadata="avatarMetadata" :image-link="imageLink" />
      </template>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useAccount, useChains, useConnect} from "@wagmi/vue";
import {isAddress, zeroAddress} from "viem";
import AvatarViewer from "~/components/AvatarViewer.vue";

const { connect, isConnected } = useConnect();
const {setAvatar, getAvatarInfo} = useAvatarService();
const {getAvatarForAddress} = useAvatarServiceApi();
const route = useRoute();
const router = useRouter();
const chains = useChains();

const IPFS_GATEWAY = "https://ipfs.io/ipfs/";

const walletAddress = ref(route.params.walletAddress ?? "");
const fetchedWalletAddress = ref("");
const avatarInfo = ref(null);
const avatarMetadata = ref(null);
const imageLink = ref("");
const selectedChain = ref(chains.value[0]);

onMounted(() => {
  if (walletAddress.value) {
    updateAvatarInfo();
  }
});

watch(selectedChain, () => {
  updateAvatarInfo();
});

const isSearchValid = computed(() => {
  return walletAddress.value && isAddress(walletAddress.value) && walletAddress.value !== fetchedWalletAddress.value;
});

function search() {
  router.push({
    params: { walletAddress: walletAddress.value }
  });

  updateAvatarInfo();
}

async function updateAvatarInfo() {
  if (!isSearchValid) return;

  try {
    const address = walletAddress.value;

    const apiRes = await getAvatarForAddress(address);

    const chainName = selectedChain.value.name.toLowerCase();

    avatarInfo.value = {
      avatar: {
        tokenAddress: apiRes["networks"][chainName]["flat"]["avatar"]["token_address"],
        tokenId: apiRes["networks"][chainName]["flat"]["avatar"]["token_id"]
      },
      owned: apiRes["networks"][chainName]["flat"]["owned"],
      uri: apiRes["networks"][chainName]["flat"]["uri"]
    }

    avatarMetadata.value = apiRes["networks"][chainName]["flat"]["avatar_metadata"];

    let src = avatarMetadata.value["image"];

    if (src && src.startsWith("ipfs://")) {
      src = src.replace("ipfs://", IPFS_GATEWAY);
    }

    imageLink.value = src;

    fetchedWalletAddress.value = address;
  } catch(error) {
    console.error("Error getting avatar:", error);
  }
}
</script>

<style scoped>
.input {
  @apply bg-neutral-100 p-4 placeholder-neutral-300 rounded-2xl w-full;
}

.select {
  @apply bg-neutral-100 p-4 placeholder-neutral-300 rounded-2xl;
}
</style>
