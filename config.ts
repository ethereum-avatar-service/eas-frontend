import { http, createConfig } from "@wagmi/vue";
import { polygon, sepolia } from "@wagmi/vue/chains";

export const config = createConfig({
  chains: [
    polygon,
    sepolia
  ],
  transports: {
    [polygon.id]: http(),
    [sepolia.id]: http()
  },
})
