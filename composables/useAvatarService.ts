import { useAccount, useWriteContract } from "@wagmi/vue";
import { abi } from "~/abi/AvatarService";
import { readContract } from "@wagmi/core";
import { config } from "~/config";
import type { ComputedRef } from "vue";

const contractAddresses: Record<number, string> = {
  11155111: "0x3011c7F4096374c4a405bE272F0deCbe2E0d8611", // Sepolia
  137: "0x02E51Eb5F6eeD7a5207cE6E3144977886Fcf90cb", // Polygon
};

export function useAvatarServiceContractAddress(): ComputedRef<string> {
  const { chainId } = useAccount();

  return computed(() => contractAddresses[chainId.value]);
}

export function useAvatarService() {
  const { address } = useAccount();
  const contractAddress = useAvatarServiceContractAddress();

  const {
    data: setAvatarHash,
    error: setAvatarError,
    isPending: setAvatarIsPending,
    writeContract
  } = useWriteContract();

  function setAvatar(tokenAddress: string, tokenId: BigInt) {
    if (!address.value || !contractAddress.value) return;

    writeContract({
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
    })
  }

  return {
    setAvatar,
    setAvatarHash,
    setAvatarError,
    setAvatarIsPending,
    getAvatarInfo
  };
}
