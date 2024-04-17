import Cookies from "js-cookie";

export const useLogout = () => {
  const logout = async () => {
    Cookies.remove("currentUser");
    return true;
  };

  return { logout };
};
