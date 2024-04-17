import { authService } from "../../services";
import { ProcessPayloadType, User } from "../../types/user";

export const useRegister = () => {
  const userRegister = async (processPayload: any) => {
    const user: any = await authService.register(processPayload);
    return user as User;
  };

  return { userRegister };
};

export const useCheckEmail = () => {
  const checkEmail = async (email: string) => {
    const user: any = await authService.checkEmailDuplicate(email);
    return user as User;
  };

  return { checkEmail };
};
