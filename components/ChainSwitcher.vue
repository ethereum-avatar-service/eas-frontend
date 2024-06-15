<template>
  <div v-click-outside="() => isSelectingChain = false" class="relative">
    <div @click="isSelectingChain = !isSelectingChain" class="px-2 h-10 flex justify-center items-center gap-1 hover:bg-neutral-100 rounded-2xl cursor-pointer duration-300" :class="{ 'bg-neutral-100': isSelectingChain }">
      <div class="w-7 h-7 flex justify-center items-center rounded-lg" :class="selectedChain.class">
        <component :is="selectedChain.icon" class="w-4 h-4" />
      </div>
      <span class="ml-1">{{ selectedChain.name }}</span>
      <ChevronDownIcon class="w-6 h-6 text-neutral-400 duration-300" :class="{ 'rotate-180': isSelectingChain }" />
    </div>
    <transition name="slide-top">
      <template v-if="isSelectingChain">
        <div class="absolute right-0 mt-2 p-2 w-64 flex flex-col bg-neutral-50 border border-neutral-100 shadow-lg shadow-neutral-100 rounded-2xl duration-300">
          <template v-for="chain in chains">
            <div @click="selectChain(chain.id)" class="px-2 w-full h-10 flex items-center gap-3 hover:bg-neutral-100 rounded-xl cursor-pointer duration-300">
              <div class="w-7 h-7 flex justify-center items-center rounded-lg" :class="chain.class">
                <component :is="chain.icon" class="w-4 h-4" />
              </div>
              <span>{{ chain.name }}</span>
              <template v-if="chain.id === selectedChain.id">
                <div class="ml-auto w-2.5 h-2.5 bg-green-400 ring ring-green-400/10 rounded-full"></div>
              </template>
            </div>
          </template>
        </div>
      </template>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {ChevronDownIcon} from "@heroicons/vue/20/solid";
import Ethereum from "~/components/icons/chains/Ethereum.vue";
import Polygon from "~/components/icons/chains/Polygon.vue";
import {useAccount, useSwitchChain} from "@wagmi/vue";

const chains = [
  {
    name: "Ethereum",
    id: 1,
    class: "bg-blue-100 fill-blue-500",
    icon: Ethereum
  },
  {
    name: "Polygon",
    id: 137,
    class: "bg-purple-100 fill-purple-500",
    icon: Polygon
  },
  {
    name: "Sepolia",
    id: 11155111,
    class: "bg-neutral-300 fill-neutral-500",
    icon: Ethereum
  }
];

const { chainId } = useAccount();
const { switchChain } = useSwitchChain();

const isSelectingChain = ref(false);

const selectedChain = computed(() => {
  let selectedChain = chains[0];

  chains.forEach((chain) => {
    if (chain.id === chainId.value) {
      selectedChain = chain;
    }
  });

  return selectedChain;
});

function selectChain(id: number) {
  switchChain({ chainId: id });
  isSelectingChain.value = false;
}
</script>

<style scoped>

</style>
