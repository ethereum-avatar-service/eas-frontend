export function useAvatarServiceApi() {
  const config = useRuntimeConfig();

  async function getAvatarForAddress(address: string) {
    const response = await fetch(`${config.public.easApi}/avatar/${address}`);
    return await response.json();
  }

  async function getWhitelist() {
    const response = await fetch(`${config.public.easApi}/whitelist`);
    return await response.json();
  }

  return {
    getAvatarForAddress,
    getWhitelist
  }
}
