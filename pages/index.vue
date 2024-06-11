<template>
  <div class="px-4">
    <header class="p-5 h-[72px] fixed w-full bg-neutral-50 border-b border-neutral-100">
      <div class="h-full flex items-center">
        <div class="hidden md:flex items-center gap-8">
          <h1 class="font-bold text-xl text-blue-400">ethereum avatar service</h1>
          <div class="flex items-center gap-2">
            <NuxtLink to="/" class="link" active-class="link-active">My avatar</NuxtLink>
            <NuxtLink class="link">Verified collections</NuxtLink>
          </div>
        </div>
        <h1 class="md:hidden font-bold text-2xl text-blue-400">eas</h1>
        <div class="ml-auto px-2 flex items-center gap-1">
          <template v-if="isConnected && address">
            <button class="px-2 h-10 flex justify-center items-center gap-1 hover:bg-neutral-100 rounded-2xl">
              <div class="w-7 h-7 flex justify-center items-center bg-purple-100 fill-purple-500 rounded-lg">
                <IconsEthereum class="w-4 h-4" />
              </div>
              <ChevronDownIcon class="w-6 h-6 text-neutral-400" />
            </button>
            <button disabled class="px-3 h-8 bg-neutral-100 text-sm text-neutral-400 rounded-full duration-300">{{ `${address.slice(0, 6)}...${address.slice(38, 42)}` }}</button>
            <button @click="disconnect" class="group px-2 h-8 flex justify-center gap-2 items-center hover:bg-red-100 text-sm text-red-400 hover:text-red-500 duration-300 rounded-full">
              <PowerIcon class="w-5 h-5" />
              <span class="hidden group-hover:block overflow-hidden transition-all duration-300">Disconnect</span>
            </button>
          </template>
          <template v-else>
            <button @click="connectWallet" class="px-3 h-10 bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 rounded-full duration-300">Connect</button>
          </template>
        </div>
      </div>
    </header>
    <div class="pt-[72px]">
      <div class="py-16">
        <div class="max-w-lg mx-auto flex flex-col gap-12">
          <template v-if="avatarInfo">
            <div class="flex flex-col items-center">
              <div class="w-48 h-48 bg-neutral-100 outline outline-offset-4 outline-8 outline-blue-500 rounded-full shadow-[0px_0px_32px_16px] shadow-blue-500/20">
                <img v-if="isImage" :src="src" class="w-full h-full object-cover rounded-full" />
                <video v-else autoplay loop muted :src="src" class="w-full h-full object-cover rounded-full" />
              </div>
              <div class="mt-16 flex flex-col gap-2 text-center w-full">
                <label class="px-2 text-sm text-neutral-400/75">Token Address</label>
                <div class="p-4 bg-neutral-100 text-neutral-400/75 rounded-2xl truncate">{{ avatarInfo.avatar?.tokenAddress }}</div>
                <label class="mt-2 px-2 text-sm text-neutral-400/75">Token ID</label>
                <div class="p-4 bg-neutral-100 text-neutral-400/75 rounded-2xl truncate">{{ avatarInfo.avatar?.tokenId }}</div>
                <div class="p-4 flex justify-center items-center gap-2">
                  <CheckBadgeIcon class="w-5 h-5 text-green-400" />
                  <span class="text-sm text-neutral-400/75">Collection is verified</span>
                </div>
                <div class="p-4 border-2 border-neutral-100 rounded-2xl">
                  <p class="text-sm text-neutral-400/75">To combat fraudulent collections, such as copycats, EAS has implemented a collection verification system.</p>
                </div>
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
          <button @click="getAvatarInfo" class="p-4 flex gap-2 flex-nowrap justify-center items-center bg-blue-500/20 hover:bg-blue-500/25 disabled:bg-neutral-100 text-blue-500 disabled:text-neutral-400/75 rounded-2xl duration-300 w-full">
            <span class="font-medium text-lg">Refresh avatar</span>
          </button>
          <hr class="h-[2px] bg-neutral-100 border-0">
          <div class="flex flex-col gap-8">
            <p class="px-2 text-neutral-500">Set one of your NFTs as the avatar for your wallet address. The NFT must be held in the same wallet.</p>
            <div class="flex flex-col gap-2">
              <label class="px-2 text-sm text-neutral-400/75">Token Address</label>
              <input :disabled="setAvatarIsPending" v-model="tokenAddress" type="text" placeholder="Token Address" class="input"/>
              <label class="mt-2 px-2 text-sm text-neutral-400/75">Token ID</label>
              <input :disabled="setAvatarIsPending" v-model="tokenId" type="number" placeholder="Token ID" class="input"/>
              <template v-if="isConnected">
                <button :disabled="isSetAvatarDisabled" @click="handleSetAvatar" class="p-4 flex gap-2 flex-nowrap justify-center items-center bg-blue-500/20 hover:bg-blue-500/25 disabled:bg-neutral-100 text-blue-500 disabled:text-neutral-400/75 rounded-2xl duration-300 w-full">
                  <span class="font-medium text-lg">Set avatar</span>
                  <template v-if="setAvatarIsPending">
                    <svg class="w-5 h-5 animate-spin text-blue-500/50 fill-blue-500" viewBox="0 0 100 101" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                  </template>
                </button>
              </template>
              <template v-else>
                <button @click="connectWallet" class="p-4 bg-blue-500/20 hover:bg-blue-500/25 font-medium text-lg text-blue-500 rounded-2xl duration-300 w-full">Connect wallet</button>
              </template>
            </div>
            <template v-if="setAvatarHash">
              <div class="p-4 flex justify-center items-center gap-2">
                <span>Transaction:</span>
                <a :href="`https://sepolia.etherscan.io/tx/${setAvatarHash}`" target="_blank" class="px-2 py-1 bg-blue-500/20 text-sm text-blue-500 rounded-full">{{ setAvatarHash.slice(0, 14) }}</a>
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
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {useAccount, useConnect, useDisconnect} from "@wagmi/vue";
import {injected} from "@wagmi/vue/connectors";
import {isAddress, zeroAddress} from "viem";
import {PowerIcon} from "@heroicons/vue/16/solid";
import {CheckBadgeIcon, ChevronDownIcon} from "@heroicons/vue/20/solid";

const { connect } = useConnect();
const { disconnect } = useDisconnect()
const { address, isConnected, chainId } = useAccount();

const {
  setAvatar,
  setAvatarHash,
  setAvatarError,
  setAvatarIsPending,
  getAvatarInfo
} = useAvatarService();

const avatarInfo = ref(null);
const tokenAddress = ref("");
const tokenId = ref(BigInt(0));

// Placeholder
const src = "https://ipfs.io/ipfs/Qmcg8f4F9cig2JWXunxJcdBe58Q5myYXPmGfuMn1TVeswD/nft.mp4";

watch(chainId, () => {
  updateAvatarInfo();
});

watch(setAvatarIsPending, () => {
  updateAvatarInfo();
});

async function updateAvatarInfo() {
  try {
    avatarInfo.value = await getAvatarInfo();
  } catch(err) {

  }
}

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

function handleSetAvatar() {
  try {
    let tokenAddr = tokenAddress.value;

    if (!tokenAddr) tokenAddr = zeroAddress;

    setAvatar(tokenAddr, tokenId.value);

    updateAvatarInfo();
  } catch (error) {
    console.error("Error setting avatar:", error);
  }
}

function connectWallet() {
  connect({ connector: injected() });
}

onMounted(() => {
  if (isConnected) {
    updateAvatarInfo();
  } else {
    connectWallet();
    updateAvatarInfo();
  }
});
</script>

<style>
.link {
  @apply px-3 h-10 flex items-center hover:bg-neutral-100 text-neutral-400 rounded-full cursor-pointer duration-300;
}

.link-active {
  @apply text-neutral-950;
}

.input {
  @apply bg-neutral-100 p-4 placeholder-neutral-300 rounded-2xl w-full;
}
</style>
