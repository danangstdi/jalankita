export const getData = async (api) => {
  const res = await fetch(api);

  if (!res.ok) {
    return false
  }

  return res.json();
}