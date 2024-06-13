export function useAvatarServiceApi() {
  const env = useRuntimeConfig().public;

  async function getAvatarForAddress(address: string) {
    const response = await fetch(`${env.EAS_API}/avatar/${address}`);
    return await response.json();
  }

  async function getWhitelist() {
    const response = await fetch(`${env.EAS_API}/whitelist`);
    return await response.json();
  }

  return {
    getAvatarForAddress,
    getWhitelist
  }
}
