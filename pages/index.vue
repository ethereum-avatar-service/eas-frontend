<template>
  <div class="py-16">
    <div class="max-w-lg mx-auto flex flex-col gap-12">
      <template v-if="isConnected">
        <template v-if="avatarInfo">
          <div class="flex flex-col items-center">
            <div class="w-48 h-48 bg-neutral-100 outline outline-offset-4 outline-8 outline-blue-500 rounded-full shadow-[0px_0px_32px_16px] shadow-blue-500/20">
              <img v-if="isImage" :src="src" class="w-full h-full object-cover rounded-full" />
              <video v-else autoplay loop muted :src="src" class="w-full h-full object-cover rounded-full" />
            </div>
            <div class="mt-16 flex flex-col gap-2 text-center w-full">
              <label class="px-2 text-sm text-neutral-400/75">Token Address</label>
              <div class="p-4 bg-neutral-100 text-neutral-400/75 rounded-2xl truncate">{{ avatarInfo.avatar?.tokenAddress }}</div>
              <div class="p-4 flex justify-center items-center gap-2">
                <CheckBadgeIcon class="w-5 h-5 text-green-400" />
                <span class="text-sm text-neutral-400/75">Collection is verified</span>
              </div>
              <div class="p-4 border-2 border-neutral-100 rounded-2xl">
                <p class="text-sm text-neutral-400/75">To combat fraudulent collections, such as copycats, EAS has implemented a collection verification system.</p>
              </div>
              <label class="mt-2 px-2 text-sm text-neutral-400/75">Token ID</label>
              <div class="p-4 bg-neutral-100 text-neutral-400/75 rounded-2xl truncate">{{ avatarInfo.avatar?.tokenId }}</div>
              <div class="p-4 rounded-2xl truncate" :class="{ 'bg-green-100 text-green-500': avatarInfo.owned, 'bg-red-100 text-red-500': !avatarInfo.owned }">{{ avatarInfo.owned ? "Owned" : "Not owned" }}</div>
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
        <hr class="h-[2px] bg-neutral-100 border-0">
      </template>
      <div class="flex flex-col gap-6">
        <p class="px-2 text-neutral-500">Set one of your NFTs as the avatar for your wallet address. The NFT must be held in the same wallet.</p>
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
              <a :href="`https://sepolia.etherscan.io/tx/${setAvatarHash}`" target="_blank" class="text-blue-500 rounded-full">{{ setAvatarHash.slice(0, 14) }}</a>
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
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useAccount, useConnect, useWaitForTransactionReceipt} from "@wagmi/vue";
import {injected} from "@wagmi/vue/connectors";
import {isAddress, zeroAddress} from "viem";
import {CheckBadgeIcon, CheckIcon, XMarkIcon} from "@heroicons/vue/20/solid";
import Loading from "~/components/icons/Loading.vue";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "~/config";

const { connect } = useConnect();
const { address, isConnected, chainId } = useAccount();
const {setAvatar, getAvatarInfo} = useAvatarService();

const avatarInfo = ref(null);
const tokenAddress = ref("0x0000000000000000000000000000000000000000");
const tokenId = ref(BigInt(0));
const setAvatarHash = ref(null);
const setAvatarError = ref(null);
const setAvatarIsPending = ref(false);

// Placeholder
const src = "https://ipfs.io/ipfs/Qmcg8f4F9cig2JWXunxJcdBe58Q5myYXPmGfuMn1TVeswD/nft.mp4";

onMounted(() => {
  if (isConnected) {
    updateAvatarInfo();
  } else {
    connectWallet();
    updateAvatarInfo();
  }
});

watch(chainId, () => {
  updateAvatarInfo();
});

watch(setAvatarIsPending, () => {
  updateAvatarInfo();
});

const isValidTokenAddress = computed(() => {
  return !!tokenAddress.value && isAddress(tokenAddress.value);
});

const isSetAvatarDisabled = computed(() => {
  const pending = setAvatarIsPending?.value || false;
  const tad = avatarInfo?.value?.avatar?.tokenAddress || "";
  const tid = avatarInfo?.value?.avatar?.tokenId || "";

  return (
      pending ||
      !isValidTokenAddress.value ||
      (tokenAddress.value === tad && tokenId.value === tid)
  );
});

const isImage = computed(() => {
  return /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(src);
});

function connectWallet() {
  connect({ connector: injected() });
}

async function handleSetAvatar() {
  try {
    setAvatarError.value = null;
    setAvatarHash.value = null;
    setAvatarIsPending.value = true;

    setAvatarHash.value = await setAvatar(tokenAddress.value, tokenId.value);

    const result = await waitForTransactionReceipt(config, {
      confirmations: 1,
      hash: setAvatarHash.value
    });

    console.log(result);

    setAvatarIsPending.value = false;

    await updateAvatarInfo();
  } catch (error) {
    setAvatarError.value = error;
    setAvatarIsPending.value = false;
    console.error("Error setting avatar:", error);
  }
}

async function updateAvatarInfo() {
  try {
    avatarInfo.value = await getAvatarInfo();
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
