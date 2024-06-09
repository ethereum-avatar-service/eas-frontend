import {useAccount, useChainId, useReadContract, useWriteContract} from "@wagmi/vue";
import { abi } from "~/abi/AvatarService";
import {useAvatarServiceContractAddress} from "~/composables/useAvatarServiceContractAddress";

export default function useAvatarService() {
  const { address } = useAccount();

  const {
    data: setAvatarHash,
    error: setAvatarError,
    isPending: setAvatarIsPending,
    writeContract
  } = useWriteContract();

  function setAvatar(tokenAddress: string, tokenId: BigInt) {
    writeContract({
      abi,
      address: useAvatarServiceContractAddress(),
      functionName: "setAvatar",
      args: [tokenAddress, tokenId]
    });
  }

  const { data: avatarInfo, refetch: getAvatarInfo } = useReadContract({
    abi,
    address: useAvatarServiceContractAddress(),
    functionName: "getAvatarInfo",
    args: [address],
  });

  return {
    setAvatar,
    setAvatarHash,
    setAvatarError,
    avatarInfo,
    setAvatarIsPending,
    getAvatarInfo
  };
}
