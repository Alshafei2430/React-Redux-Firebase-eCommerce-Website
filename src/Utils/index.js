export const checkUserIsAdmin = (curretUser) => {
  if (!curretUser || !Array.isArray(curretUser.userRoles)) return;
  const { userRoles } = curretUser;
  if (userRoles.includes("admin")) return true;
  return false;
};
