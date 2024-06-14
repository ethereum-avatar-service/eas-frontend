import { http, createConfig } from "@wagmi/vue";
import { mainnet, polygon, sepolia } from "@wagmi/vue/chains";

export const config = createConfig({
  chains: [
    mainnet,
    polygon,
    sepolia
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [sepolia.id]: http()
  },
})
