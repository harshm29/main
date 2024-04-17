import { UserSession } from "nexmo-client";
import { adminService } from "../../services";
import Cookies from "js-cookie";
import { User } from "../../types/user";

export const adminLogin = () => {
  const login = async (email: string, password: string, type: string) => {
    const user: any = await adminService.login(email, password, type);
    if (user) {
      Cookies.set("currentUser", JSON.stringify(user));
    }
    return user as User;
  };
  return { login };
};

export const DoctorInvitation = () => {
  const InviteUser = async (name: string, email: string) => {
    const user: any = await adminService.InviteUser(name, email);

    return user as User;
  };
  return { InviteUser };
};
