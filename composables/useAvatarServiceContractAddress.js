import {useChainId} from "@wagmi/vue";

const contractAddresses = {
    11155111: "0x3011c7F4096374c4a405bE272F0deCbe2E0d8611", // Sepolia
    137: "0x02E51Eb5F6eeD7a5207cE6E3144977886Fcf90cb", // Polygon
};

export function useAvatarServiceContractAddress() {
    const chainId = useChainId();

    console.log(chainId.value);
    console.log(contractAddresses[chainId.value]);

    return contractAddresses[chainId.value];
}
