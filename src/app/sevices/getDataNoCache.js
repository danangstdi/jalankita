export const getDataNoCache = async (api) => {
  const res = await fetch(api, { cache: "no-store" });

  if (!res.ok) {
    return false
  }

  return res.json();
}