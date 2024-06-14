import { http, createConfig } from "@wagmi/vue";
import { sepolia, polygon } from "@wagmi/vue/chains";

export const config = createConfig({
  chains: [
    sepolia,
    polygon
  ],
  transports: {
    [sepolia.id]: http(),
    [polygon.id]: http()
  },
})
