import * as React from "react";
import { toast } from "react-toastify";
import style from "../../../components/common/css/setting.module.scss";
import Image from "next/image";
import password from "../../../../public/assets/img/password.svg";

import OTPInput from "../../../components/ui/OTPInput";
import {
  useSentotppwd,
  useChangeppwd,
  useResentotppwd,
} from "../../../hooks/auth/useLogin";
import { useCurrentUser } from "../../../hooks/auth/useCurrentUser";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  oldpassword: string;
  newpassword: string;
  confim_password: string;
};
const Setting = () => {
  const { user: currentUser } = useCurrentUser();
  const { sentpwd } = useSentotppwd();
  const { resentpwd } = useResentotppwd();
  const { changepwd } = useChangeppwd();
  const [oldpassword, setoldPassword] = React.useState("");
  const [newpassword, setnewPassword] = React.useState("");
  const [Pwdform, setPwdform] = React.useState(true);
  const [OTPform, setOTPform] = React.useState(false);
  const [otp, setOtp] = React.useState("");

  const [minutes, setMinutes] = React.useState(1);
  const [seconds, setSeconds] = React.useState(10);
  const [pwddata, setPwddata] = React.useState({});
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    let user_id = currentUser?.id;
    sentpwd(data.oldpassword, user_id, "change")
      .then((res: any) => {
        console.log(res);
        if (res.status == true) {
          setPwdform(false);
          setOTPform(true);
          setMinutes(1);
          setSeconds(10);
          setPwddata(data);
          toast.success(res.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          setPwdform(true);
          setOTPform(false);
          setPwddata({});
          toast.error(res.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((e) =>
        toast.error(e, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

  const UpdatePWD = (e: any) => {
    if (otp.length == 4) {
      let user_id_d = currentUser?.id;
      changepwd(otp, user_id_d, oldpassword, newpassword)
        .then((res: any) => {
          console.log(res);
          if (res.status == true) {
            setPwdform(true);
            setOTPform(false);
            setoldPassword("");
            setnewPassword("");
            toast.success(res.message, {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            reset({
              oldpassword: "",
              newpassword: "",
              confim_password: "",
            });
          } else {
            toast.error(res.message, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }
        })
        .catch((e) =>
          toast.error(e, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          })
        );
    } else {
      toast.error("Please enter correct OTP!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  // Profile edit
  const resendOtpHandler = (e: any) => {
    //console.log("resendOtpHandler");
    if (seconds === 0) {
      let userId = currentUser?.id;
      resentpwd(userId, "change").then((resp: any) => {
        if (resp?.status) {
          toast.success(resp.message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setMinutes(1);
          setSeconds(30);
        } else {
          toast.error(resp?.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      });
    }
  };

  return (
    <>
      <div
        id="ChangePassword"
        className={`card ${style.card}  ${style.nric_card} ${style.changepassword_card}`}
      >
        <div className={`top_bar ${style.top_bar}`}>
          <h4 className={`card_title ${style.card_title}`}>Change Password</h4>
        </div>
        <div className={`bottom_bar ${style.bottom_bar}`}>
          <form key={1} noValidate onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              {Pwdform && (
                <>
                  <div
                    className={`form_field_wrapper ${style.form_field_wrapper}`}
                  >
                    <Image
                      className="field_icon"
                      src={password}
                      alt="Password"
                      width={17}
                      height={20}
                      priority
                    />

                    <input
                      type="password"
                      placeholder="Old Password"
                      value={oldpassword}
                      {...register("oldpassword", {
                        required: "Old Password is required",
                      })}
                      onChange={(e) => setoldPassword(e.target.value)}
                      className={`form-control field_with_icon ${
                        errors?.oldpassword?.message
                          ? "border border-danger"
                          : ""
                      }`}
                      required
                    />
                    {errors?.oldpassword?.message ? (
                      <div
                        className="text-danger pb-2"
                        style={{ float: "left" }}
                      >
                        {errors?.oldpassword?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className={`form_field_wrapper ${style.form_field_wrapper}`}
                  >
                    <Image
                      className="field_icon"
                      src={password}
                      alt="Password"
                      width={17}
                      height={20}
                      priority
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      value={newpassword}
                      {...register("newpassword", {
                        required: "Old Password is required",
                        pattern: {
                          value:
                            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                          message: "Please enter a strong password",
                        },
                      })}
                      onChange={(e) => setnewPassword(e.target.value)}
                      className={`form-control field_with_icon ${
                        errors?.newpassword?.message
                          ? "border border-danger"
                          : ""
                      }`}
                      required
                    />
                    {errors?.newpassword?.message ? (
                      <div
                        className="text-danger pb-2"
                        style={{ float: "left" }}
                      >
                        {errors?.newpassword?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div
                    className={`form_field_wrapper ${style.form_field_wrapper}`}
                  >
                    <Image
                      className="field_icon"
                      src={password}
                      alt="Password"
                      width={17}
                      height={20}
                      priority
                    />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      {...register("confim_password", {
                        required: "Confirm Password is required",
                        validate: (val: string) => {
                          console.log(val);
                          if (watch("newpassword") != val) {
                            return "Your passwords do no match";
                          }
                        },
                      })}
                      className={`form-control field_with_icon ${
                        errors?.confim_password?.message
                          ? "border border-danger"
                          : ""
                      }`}
                    />
                    {errors?.confim_password?.message ? (
                      <div
                        className="text-danger pb-2"
                        style={{ float: "left" }}
                      >
                        {errors?.confim_password?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </>
              )}

              <div className={`otp_section ${style.otp_section}`}>
                {OTPform && (
                  <>
                    <label>Enter OTP</label>
                    <OTPInput
                      autoFocus
                      isNumberInput={false}
                      length={4}
                      inputClassName={`form-control ${style.formcontrol} `}
                      onChangeOTP={(otp) => {
                        otp.length == 4 ? setOtp(otp) : "";
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => UpdatePWD(e)}
                    >
                      Update
                    </button>

                    <div className={`text-center m-4 ${style.timer}`}>
                      {minutes}:{seconds}
                    </div>

                    <div
                      className={`form_field_wrapper signuplink_block text-center mt-4 ${style.resend_otp}`}
                    >
                      <p
                        className={`ato cursor-pointer signupa ${
                          seconds > 0 || minutes > 0 ? "d-none" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        Didn't Receive OTP? &nbsp;
                        <span
                          className={`cursor-pointer signup_txt  `}
                          onClick={(e) => resendOtpHandler(e)}
                        >
                          Resend OTP
                        </span>
                      </p>
                    </div>
                  </>
                )}

                {/* <label>Enter OTP</label> */}

                {Pwdform && (
                  <button type="submit" className="btn btn-primary">
                    Update
                  </button>
                )}
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </>
  );
};

export default Setting;
