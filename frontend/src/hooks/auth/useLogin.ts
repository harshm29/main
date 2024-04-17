import { authService } from "../../services";
import Cookies from "js-cookie";
import { User, Verified, Forgotpwd, Userinfo } from "../../types/user";

export const useLoginmain = () => {
  const loginmain = async (email: string, password: string) => {
    const user: any = await authService.loginmain(email, password);
    if (user) {
      const expirationTime = new Date();
      expirationTime.setDate(expirationTime.getDate() + 1); // Set the expiration time to 1 day from now
      Cookies.set("currentUser", JSON.stringify(user), {
        expires: expirationTime,
        path: "/",
      });
    }
    return user as Verified;
  };
  return { loginmain };
};

export const useLogin = () => {
  const login = async (email: string, password: string, type?: string) => {
    const user: any = await authService.login(email, password, type);
    if (user?.status) {
      Cookies.set("currentUser", JSON.stringify(user));
    }

    return user as Verified;
  };
  return { login };
};

// ***** Resend OTP **********
export const useResendOtp = () => {
  const resendOtp = async (userId: string) => {
    const Verif: any = await authService.resendOtp(userId);
    if (Verif) {
      console.log(Verif);
      Cookies.set("currentUser", JSON.stringify(Verif));
    }
    return Verif as Verified;
  };
  return { resendOtp };
};

// ***** Forgot password **********
export const useForgotpwd = () => {
  const forgotpwd = async (email: string, type: string) => {
    const user: any = await authService.forgotpwd(email, type);
    return user as Forgotpwd;
  };
  return { forgotpwd };
};

// ***** Confirm your password **********
export const useConfirmpwd = () => {
  const confirpwd = async (password: string, userId: string) => {
    const user: any = await authService.confirmpwd(password, userId);
    return user as Forgotpwd;
  };
  return { confirpwd };
};

export const useSentotppwd = () => {
  const sentpwd = async (
    oldpassword: string,
    user_id: string,
    type: string
  ) => {
    const user: any = await authService.sentotpmpwd(oldpassword, user_id, type);
    return user as Forgotpwd;
  };
  return { sentpwd };
};

export const useResentotppwd = () => {
  const resentpwd = async (user_id: string, type: string) => {
    const user: any = await authService.ResentOtpPwd(user_id, type);
    return user as Forgotpwd;
  };
  return { resentpwd };
};
export const useChangeppwd = () => {
  const changepwd = async (
    otp: string,
    user_id: string,
    oldpassword: string,
    newpassword: string
  ) => {
    const user: any = await authService.changepmpwd(
      otp,
      user_id,
      oldpassword,
      newpassword
    );
    return user as Forgotpwd;
  };
  return { changepwd };
};
//get login user
export const useUserinfo = () => {
  const userinfo = async () => {
    const user: any = await authService.getMe();
    return user as Userinfo;
  };
  return { userinfo };
};

export const useStatusupdate = () => {
  const statusupdate = async (status: string) => {
    const user: any = await authService.StatusUpdate(status);
    return user as Userinfo;
  };
  return { statusupdate };
};

export const useUserinfoupdate = () => {
  const userinfoupdate = async (
    nationality: string,
    education: string,
    clinic: string,
    documents_file: string,
    sign_file: string
  ) => {
    const user: any = await authService.UserinfoUpdate(
      nationality,
      education,
      clinic,
      documents_file,
      sign_file
    );
    //console.log(user, nationality, education, "second");
    return user as Userinfo;
  };
  return { userinfoupdate };
};

export const useProfileupdate = () => {
  const profileupdate = async (
    name: string,
    mobile: string,
    dob: string,
    address: string,
    profileImg?: any
  ) => {
    const user: any = await authService.ProfileUpdate(
      name,
      mobile,
      dob,
      address,
      profileImg
    );

    return user as Userinfo;
  };
  return { profileupdate };
};
