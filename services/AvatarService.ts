import {useAccount, useReadContract, useWriteContract} from "@wagmi/vue";
import { abi } from "~/abi/AvatarService";

const contractAddress = "0xAD3f6f599dcd1F7D450f170A1b353eEb6048cb8a";

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
      address: contractAddress,
      functionName: "setAvatar",
      args: [tokenAddress, tokenId]
    });
  }

  const { data: avatarInfo, refetch: getAvatarInfo } = useReadContract({
    abi,
    address: contractAddress,
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
