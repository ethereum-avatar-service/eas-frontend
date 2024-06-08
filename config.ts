import { http, createConfig } from "@wagmi/vue"
import { sepolia } from "@wagmi/vue/chains"

export const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
})
