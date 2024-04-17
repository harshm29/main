import axios, { AxiosInstance } from "axios";
import { ProcessPayloadType } from "../types/user";
import { getAuthorizationHeader } from "../utils/getAuthorizationHeader";

export class AuthService {
  protected readonly instance: AxiosInstance;
  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 30000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = (email: string, password: string, type?: string) => {
    return this.instance
      .post("/user/login", {
        email,
        password,
        type,
      })
      .then((res: any) => {
        console.log(res.data, "login");
        if (res.data.isSuccess) {
          return {
            user: res.data.userDetails,
            username: res.data.userDetails.name,
            id: res.data.userDetails._id,
            accessToken: res.data.token,
            type: res.data.userDetails.type,
            status: res.data.isSuccess,
            message: res.data.message,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };

  register = async (processPayload: any) => {
    return this.instance
      .post("/user/registration", {
        ...processPayload,
      })
      .then((res: any) => {
        if (res?.data?.isSuccess) {
          return {
            id: res?.data?.data._id,
            status: res?.data?.isSuccess,
            userDetails: res?.data?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        }
      });
  };

  stepProcessComplete = async (processPayload: ProcessPayloadType) => {
    return this.instance
      .post("/step-registration", {
        ...processPayload,
      })

      .then((res: any) => {
        sessionStorage.setItem("userData", JSON.stringify(res?.data?.data));
        if (res?.data?.isSuccess) {
          return {
            id: res?.data?.data._id,
            status: res?.data?.isSuccess,
            userDetails: res?.data?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        }
      });
  };

  processComplete = async (processPayload: ProcessPayloadType) => {
    return this.instance
      .post("/step-registration", {
        ...processPayload,
      })
      .then((res: any) => {
        if (res?.data?.isSuccess) {
          return {
            id: res?.data?.data._id,
            status: res?.data?.isSuccess,
            userDetails: res?.data?.data,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        }
      });
  };

  getMe = () => {
    return this.instance
      .get(`/user/user-info`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        if (res?.data?.isSuccess) {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
            data: res?.data?.data,
          };
        } else {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        }
      });
  };

  Logout = () => {
    return this.instance
      .get(`/user/logout`, {
        headers: getAuthorizationHeader(),
      })
      .then((res) => {
        sessionStorage.clear();
        if (res?.data?.isSuccess) {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        }
      });
  };

  StatusUpdate = (status: string) => {
    return this.instance
      .post(
        `/status-update-doc`,
        {
          status,
        },
        {
          headers: getAuthorizationHeader(),
        }
      )
      .then((res) => {
        if (res?.data?.isSuccess) {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
            data: res?.data?.data,
          };
        } else {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        }
      });
  };

  UserinfoUpdate = (
    nationality: string,
    education: string,
    clinic: string,
    documents_file: string,
    sign_file: string
  ) => {
    return this.instance
      .post(
        `/user-info-update`,
        { nationality, education, clinic, documents_file, sign_file },
        {
          headers: getAuthorizationHeader(),
        }
      )
      .then((res) => {
        if (res?.data?.isSuccess) {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        }
      });
  };

  ProfileUpdate = (
    name: string,
    mobile: string,
    dob: string,
    address: string,
    profileImg?: string
  ) => {
    return this.instance
      .post(
        `/profile-update`,
        { name, mobile, dob, address, profile_pic: profileImg },
        {
          headers: getAuthorizationHeader(),
        }
      )
      .then((res) => {
        if (res?.data?.isSuccess) {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        } else {
          return {
            status: res?.data?.isSuccess,
            message: res?.data?.message,
          };
        }
      });
  };

  forgotpwd = (email: string, type: string) => {
    return this.instance
      .post("/user/forgotPassword", {
        email,
        type,
      })
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };

  confirmpwd = (password: string, userId: string) => {
    return this.instance
      .post("/user/create-password", {
        password,
        userId,
      })
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
            user_type: res.data.userType,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };

  sentotpmpwd = (oldpassword: string, user_id: string, type: string) => {
    return this.instance
      .post("/send-otp", {
        oldpassword,
        user_id,
        type,
      })
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };

  ResentOtpPwd = (user_id: string, type: string) => {
    return this.instance
      .post("/pwd-resendotp", {
        user_id,
        type,
      })
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };

  changepmpwd = (
    otp: string,
    user_id: string,
    oldpassword: string,
    newpassword: string
  ) => {
    return this.instance
      .post("/changePassword", {
        otp,
        user_id,
        oldpassword,
        newpassword,
      })
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };

  checkEmailDuplicate = (email: string) => {
    return this.instance
      .post("/user/check-email", {
        email: email,
      })
      .then((res: any) => {
        if (res.data.isSuccess) {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        } else {
          return {
            status: res.data.isSuccess,
            message: res.data.message,
          };
        }
      });
  };
}
