import { http, createConfig } from "@wagmi/vue";
import { mainnet, polygon, sepolia, base } from "@wagmi/vue/chains";

export const config = createConfig({
  chains: [
    mainnet,
    polygon,
    base,
    sepolia
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [base.id]: http(),
    [sepolia.id]: http()
  },
})
