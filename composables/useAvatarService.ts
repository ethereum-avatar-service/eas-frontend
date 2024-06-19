import { useAccount, useWriteContract } from "@wagmi/vue";
import { abi } from "~/abi/AvatarService";
import { writeContract, readContract } from "@wagmi/core";
import { config } from "~/config";
import type { ComputedRef } from "vue";

const contractAddresses: Record<number, string> = {
  1: "0x9AfDC4097DCDc49Aac58D4aaEa353B3a8ec60F1d", // Mainnet
  11155111: "0xdCD59d96454D585B12Ef167c15c43D0BFF96DC3F", // Sepolia
  137: "0xd9517Fa5223322e1bD731af127A7C51fd34c2222", // Polygon
  8453: "0xAD3f6f599dcd1F7D450f170A1b353eEb6048cb8a" // Base
};

export function useAvatarServiceContractAddress(): ComputedRef<string> {
  const { chainId } = useAccount();

  return computed(() => contractAddresses[chainId.value]);
}

export function useAvatarService() {
  const { address } = useAccount();
  const contractAddress = useAvatarServiceContractAddress();

  async function setAvatar(tokenAddress: string, tokenId: BigInt) {
    if (!address.value || !contractAddress.value) return;

    return await writeContract(config, {
      abi,
      account: address.value,
      address: contractAddress.value,
      functionName: "setAvatar",
      args: [tokenAddress, tokenId]
    });
  }

  async function getAvatarInfo() {
    if (!address.value || !contractAddress.value) return;

    return await readContract(config, {
      abi,
      address: contractAddress.value,
      functionName: "getAvatarInfo",
      args: [address.value],
      query: {
        gcTime: "Infinity"
      }
    })
  }

  return {
    setAvatar,
    getAvatarInfo
  };
}
