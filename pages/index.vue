<template>
  <div class="py-8 lg:py-16">
    <div class="max-w-lg mx-auto flex flex-col gap-12">
      <template v-if="isConnected">
        <AvatarViewer :avatar-info="avatarInfo" :avatar-metadata="avatarMetadata" :image-link="imageLink" />
        <hr class="h-[2px] bg-neutral-100 border-0">
      </template>
      <div class="flex flex-col gap-6">
        <p class="px-2 text-neutral-500">You can set one of your NFTs as the avatar for your wallet address. To do this, the NFT must be held in the same wallet and must have a token URI that points to an IPFS source containing an "image" field.</p>
        <div class="flex flex-col gap-2">
          <label class="px-2 text-sm text-neutral-400/75">Token Address</label>
          <input :disabled="setAvatarIsPending" v-model="tokenAddress" type="text" placeholder="Token Address" class="input"/>
          <label class="mt-2 px-2 text-sm text-neutral-400/75">Token ID</label>
          <input :disabled="setAvatarIsPending" v-model="tokenId" type="number" placeholder="Token ID" class="input"/>
          <template v-if="isConnected">
            <button :disabled="isSetAvatarDisabled" @click="handleSetAvatar" class="px-3 h-14 flex gap-2 flex-nowrap justify-center items-center bg-blue-500/20 hover:bg-blue-500/25 disabled:bg-neutral-100 text-blue-500 disabled:text-neutral-400/75 rounded-2xl duration-300 w-full">
              <template v-if="!setAvatarIsPending">
                <span class="font-medium text-lg">Set avatar</span>
              </template>
              <template v-else>
                <Loading class="w-6 h-6 text-blue-500/50 fill-blue-500" />
              </template>
            </button>
          </template>
          <template v-else>
            <button @click="connectWallet" class="p-3 h-14 bg-blue-500/20 hover:bg-blue-500/25 font-medium text-lg text-blue-500 rounded-2xl duration-300 w-full">Connect wallet</button>
          </template>
        </div>
        <template v-if="setAvatarHash">
          <div class="flex flex-col gap-6">
            <div class="p-4 flex justify-center items-center gap-2">
              <span class="text-neutral-400/75">Transaction:</span>
              <a :href="`${blockExplorer}/tx/${setAvatarHash}`" target="_blank" class="text-blue-500 rounded-full">{{ setAvatarHash.slice(0, 14) }}</a>
            </div>
            <template v-if="setAvatarIsPending">
              <div class="p-4 flex justify-center items-center gap-2 bg-neutral-100 text-neutral-500 rounded-2xl">
                <span>Pending</span>
                <Loading class="w-5 h-5 fill-neutral-500 text-neutral-400" />
              </div>
            </template>
            <template v-else-if="setAvatarError">
              <div class="p-4 flex justify-center items-center gap-2 bg-red-100 text-red-500 rounded-2xl">
                <span>Error</span>
                <XMarkIcon class="w-5 h-5 text-red-500" />
              </div>
            </template>
            <template v-else>
              <div class="p-4 flex justify-center items-center gap-2 bg-green-100 text-green-500 rounded-2xl">
                <span>Confirmed</span>
                <CheckIcon class="w-5 h-5 text-green-500" />
              </div>
            </template>
          </div>
        </template>
        <template v-else-if="setAvatarError">
          <div class="p-4 flex justify-center items-center gap-2 border-2 border-red-500/20 rounded-2xl">
            <span class="px-2 py-1 break-all text-sm text-red-500 rounded-full">{{ setAvatarError }}</span>
          </div>
        </template>
      </div>
      <hr class="h-[2px] bg-neutral-100 border-0">
      <Faq />
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useAccount, useConnect} from "@wagmi/vue";
import {injected} from "@wagmi/vue/connectors";
import {isAddress, zeroAddress} from "viem";
import {CheckIcon, XMarkIcon} from "@heroicons/vue/20/solid";
import Loading from "~/components/icons/Loading.vue";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "~/config";
import AvatarViewer from "~/components/AvatarViewer.vue";
import Faq from "~/components/Faq.vue";

const { connect } = useConnect();
const { address, isConnected, chainId, chain } = useAccount();
const {setAvatar, getAvatarInfo} = useAvatarService();
const {getAvatarForAddress} = useAvatarServiceApi();

const IPFS_GATEWAY = "https://ipfs.io/ipfs/";

const avatarInfo = ref(null);
const avatarMetadata = ref(null);
const tokenAddress = ref(zeroAddress);
const tokenId = ref(BigInt(0));
const setAvatarHash = ref(null);
const setAvatarError = ref(null);
const setAvatarIsPending = ref(false);
const imageLink = ref("");

onMounted(() => {
  if (isConnected.value && address.value) {
    updateAvatarInfo();
  }
});

watch([chainId, isConnected], () => {
  resetStates();
  if (isConnected.value && address.value) {
    updateAvatarInfo();
  }
});

const blockExplorer = computed(() => {
  return chain.value?.blockExplorers?.default?.url ?? "https://etherscan.io";
});

const isValidTokenAddress = computed(() => {
  return !!tokenAddress.value && isAddress(tokenAddress.value);
});

const isSetAvatarDisabled = computed(() => {
  const pending = setAvatarIsPending?.value || false;
  const tad = avatarInfo.value?.avatar?.tokenAddress || "";
  const tid = avatarInfo.value?.avatar?.tokenId || "";

  return (
      pending ||
      !isValidTokenAddress.value ||
      (tokenAddress.value === tad && tokenId.value === tid)
  );
});

function resetStates() {
  setAvatarError.value = null;
  setAvatarHash.value = null;
  imageLink.value = "";
}

function connectWallet() {
  connect({ connector: injected() });
}

async function handleSetAvatar() {
  try {
    resetStates();
    setAvatarIsPending.value = true;

    setAvatarHash.value = await setAvatar(tokenAddress.value, tokenId.value);

    const hash = setAvatarHash.value;

    await waitForTransactionReceipt(config, {
      confirmations: 2,
      hash
    });

    setAvatarIsPending.value = false;

    updateAvatarInfo();
  } catch (error) {
    setAvatarError.value = error;
    setAvatarIsPending.value = false;
    console.error("Error setting avatar:", error);
  }
}

async function updateAvatarInfo() {
  try {
    getAvatarInfo().then(data => {
      avatarInfo.value = data;
    });

    const apiRes = await getAvatarForAddress(address.value);

    const chainName = chain.value.name.toLowerCase();

    avatarMetadata.value = apiRes["networks"][chainName]["flat"]["avatar_metadata"];

    let src = avatarMetadata.value["image"];

    if (src.startsWith("ipfs://")) {
      src = src.replace("ipfs://", IPFS_GATEWAY);
    }

    imageLink.value = src;
  } catch(error) {
    console.error("Error getting avatar:", error);
  }
}
</script>

<style scoped>
.input {
  @apply bg-neutral-100 p-4 placeholder-neutral-300 rounded-2xl w-full;
}
</style>
