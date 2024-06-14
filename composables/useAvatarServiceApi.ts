export function useAvatarServiceApi() {
  const env = useRuntimeConfig();

  async function getAvatarForAddress(address: string) {
    const response = await fetch(`${env.public.EAS_API}/avatar/${address}`);
    return await response.json();
  }

  async function getWhitelist() {
    const response = await fetch(`${env.public.EAS_API}/whitelist`);
    return await response.json();
  }

  return {
    getAvatarForAddress,
    getWhitelist
  }
}
