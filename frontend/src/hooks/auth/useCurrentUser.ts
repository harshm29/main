import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Verified } from "../../types/user";
import { authService } from "../../services";

export const useCurrentUser = () => {
  const [user, setUser] = useState<Verified | null>(null);

  useEffect(() => {
    const currentUser = Cookies.get("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    }
  }, []);

  const refetchUser = async () => {
    const userInfo = await authService.getMe();
    const currentUser = Cookies.get("currentUser");

    if (userInfo && currentUser) {
      const newUser = {
        ...JSON.parse(currentUser),
        username: userInfo.data.name,
        type: userInfo.data.type,
      };
      Cookies.set("currentUser", JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  return { user, refetchUser };
};
