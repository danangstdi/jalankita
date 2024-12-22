export const getSessionClient = (key) => {
  const session = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${key}=`))
    ?.split("=")[1];

  return session;
};
