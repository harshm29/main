import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

import profile from "../../public/assets/img/profile.svg";
import email from "../../public/assets/img/email.svg";
import phone from "../../public/assets/img/phone.svg";
import password from "../../public/assets/img/password.svg";
import calendar from "../../public/assets/img/calendar.svg";
import style from "../user/css/signup.module.scss";
import { useCheckEmail, useRegister } from "../../src/hooks/auth/useRegister";
import { useCurrentUser } from "../../src/hooks/auth/useCurrentUser";
import moment from "moment";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Header from "../../src/components/common/Layouts/frontend/user/Header";
import Footer from "../../src/components/common/Layouts/frontend/user/Footer";
import { toast } from "react-toastify";
import { showToast, validatePhoneNumber } from "../../src/utils/comman";

const SignUp = () => {
  const router = useRouter();
  const { user: currentUser } = useCurrentUser();
  const { checkEmail } = useCheckEmail();
  const { userRegister } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  }: any = useForm();

  const [inputData, setInputData] = useState<any>({
    name: "",
    type: "user",
    email: "",
    mobile: "",
    dob: "",
    password: "",
    gender: "",
    confim_password: "",
  });
  const [emailExist, setEmailExist] = useState(false);

  //  *************** Register handler ****************************
  const handleRegister = async (data: any) => {
    console.log(inputData.dob !== "Invalid date" && inputData.dob !== "");
    if (inputData.dob !== "Invalid date" && inputData.dob !== "") {
      checkEmailDuplicacy(data);
    } else {
      toast.error("Please select DOB!!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const checkEmailDuplicacy = (email: any) => {
    checkEmail(email?.email).then((res: any) => {
      if (res?.status) {
        setEmailExist(true);
        toast(res?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log("Passed !", res.data);
      } else {
        let messageData = Object.keys(res?.message);
        console.log(
          "res?.message ::::::::::",
          messageData?.length,
          Object.keys(res?.message)
        );

        const { type, dob } = inputData;
        const payloadData = {
          ...email,
          dob: dob,
          type: type,
        };

        if (dob !== "Invalid date" || dob !== "") {
          userRegister(payloadData).then((res) => {
            if (res?.status) {
              toast.success(res?.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              router.push("/user/login");
            } else {
              toast.error(res?.message, {
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
        } else {
          showToast("Date of birth is required");
        }
      }
    });
  };

  const validatePassword = (value: any) => {
    if (
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
        value
      )
    ) {
      return true;
    } else {
      return false;
    }
  };

  const inputChangeHandler = (e: any) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      setInputData((prevInputData: any) => ({
        ...prevInputData,
        [name]: `+${value}`, // Prepend the "+" symbol
      }));
    } else {
      setInputData((prevInputData: any) => ({
        ...prevInputData,
        [name]: value,
      }));
    }
  };

  // ************** Date handler **********************************
  const dateChangeHandler = (e: any) => {
    const dobInput = moment(e).format("YYYY-MM-DD");

    setInputData({
      ...inputData,
      dob: dobInput,
    });
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_wrapper">
        <Header />
        <div className="userauth signup">
          <div className="userauth_inner">
            <h1 className="auth_title">
              Could you fill up these mandatory <br />
              <span>details please?</span>
            </h1>
            <div className="form_wrapper">
              <form onSubmit={handleSubmit(handleRegister)}>
                <fieldset>
                  <div className="form_field_wrapper">
                    <Image
                      className="field_icon"
                      src={profile}
                      alt="Profile"
                      width={16}
                      height={20}
                      priority
                    />
                    <input
                      type="text"
                      placeholder="Name "
                      id="name"
                      onChange={inputChangeHandler}
                      {...register("name", {
                        required: "Name is required",
                        minLength: {
                          value: 2,
                          message: "Name must be at least 2 characters long",
                        },
                        maxLength: {
                          value: 100,
                          message: "Name cannot exceed 100 characters",
                        },
                        pattern: {
                          value: /^[a-zA-Z\s]+$/i,
                          message: "Please enter a valid Name",
                        },
                      })}
                      className={`form-control field_with_icon ${
                        errors?.name?.message ? "border border-danger" : ""
                      }`}
                    />
                    {errors?.name?.message ? (
                      <div
                        className="text-danger pb-2"
                        style={{ float: "left" }}
                      >
                        {errors?.name?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form_field_wrapper">
                    <Image
                      className="field_icon"
                      src={email}
                      alt="Email"
                      width={18}
                      height={16}
                      priority
                    />
                    <input
                      type="email"
                      onChange={inputChangeHandler}
                      placeholder="Email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                          message: "Please enter a valid email aadress",
                        },
                      })}
                      className={`form-control field_with_icon ${
                        errors?.email?.message ? "border border-danger" : ""
                      }`}
                    />
                    {errors?.email?.message ? (
                      <div
                        className="text-danger pb-2"
                        style={{ float: "left" }}
                      >
                        {errors?.email?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form_field_wrapper">
                    <Image
                      className="field_icon"
                      src={phone}
                      alt="Phone"
                      width={20}
                      height={20}
                      priority
                    />
                    <input
                      type="text"
                      placeholder="91XXXXXXXX"
                      onChange={inputChangeHandler}
                      maxLength={12}
                      {...register("mobile", {
                        required: {
                          value: true,
                          message: "Please add your mobile phone number.",
                        },
                        pattern: {
                          value: /^91\d{10}$/,
                          message: "This is not a valid  phone number.",
                        },
                        minLength: {
                          value: 10,
                          message: "The phone number is too short.",
                        },
                        maxLength: {
                          value: 12,
                          message: "The phone number is too long.",
                        },
                      })}
                      className={`form-control field_with_icon ${
                        errors?.mobile?.message ? "border border-danger" : ""
                      }`}
                    />

                    {errors?.mobile?.message ? (
                      <span
                        className="text-danger pb-2"
                        style={{ float: "left" }}
                      >
                        {errors?.mobile?.message}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form_field_wrapper">
                    <Image
                      className="field_icon"
                      src={profile}
                      alt="Profile"
                      width={16}
                      height={20}
                      priority
                    />
                    <input
                      type="text"
                      placeholder="VoterID "
                      id="VoterID"
                      {...register("voterid", {
                        required: "VoterID is required",
                      })}
                      className={`form-control field_with_icon ${
                        errors?.voterid?.message ? "border border-danger" : ""
                      }`}
                    />
                    {errors?.voterid?.message ? (
                      <div
                        className="text-danger pb-2"
                        style={{ float: "left" }}
                      >
                        {errors?.voterid?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form_field_wrapper date_picker">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <Image
                        className="field_icon"
                        src={calendar}
                        alt="Calendar"
                        width={18}
                        height={20}
                        priority
                      />
                      <DatePicker
                        onChange={dateChangeHandler}
                        disableFuture={true}
                        format="DD-MM-YYYY"
                      />
                    </LocalizationProvider>
                  </div>

                  <div className="form_field_wrapper password">
                    <Image
                      className="field_icon"
                      src={profile}
                      alt="Calendar"
                      width={18}
                      height={20}
                      priority
                    />
                    <select
                      name="gender"
                      onChange={inputChangeHandler}
                      id="gender-select"
                      className={`form-control field_with_icon ${
                        errors?.gender?.message ? "border border-danger" : ""
                      }`}
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                    >
                      <option value="">Select Gender</option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="T">Transgender</option>
                    </select>
                    {errors?.gender?.message ? (
                      <div
                        className="text-danger pb-2"
                        style={{ float: "left" }}
                      >
                        {errors?.gender?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form_field_wrapper password">
                    <Image
                      className={`${
                        errors?.password?.message
                          ? "field_icon_space"
                          : "field_icon"
                      }`}
                      src={password}
                      alt="Password"
                      width={17}
                      height={20}
                      priority
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={inputChangeHandler}
                      {...register("password", {
                        required: "Password is required",
                        validate: (value: any) =>
                          validatePassword(value) ||
                          "Password must be 8 digits long which contain letters, numbers, and special characters",
                      })}
                      className={`form-control field_with_icon ${
                        errors?.password?.message ? "border border-danger" : ""
                      }`}
                    />

                    {errors?.password?.message ? (
                      <div
                        className="text-danger pb-2"
                        style={{ float: "left" }}
                      >
                        {errors?.password?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form_field_wrapper password">
                    <Image
                      className={`${
                        errors?.confim_password?.message
                          ? "field_icon_fspace"
                          : "field_icon"
                      }`}
                      src={password}
                      alt="Password"
                      width={17}
                      height={20}
                      priority
                    />
                    <input
                      type="password"
                      name="confim_password"
                      placeholder="Confirm Password"
                      {...register("confim_password", {
                        required: "Confirm Password is required",

                        validate: (val: string) => {
                          console.log(val);
                          if (watch("password") != val) {
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

                  <div
                    className={`form_field_wrapper signuplink_block mt-5 ${style.resend_otp}`}
                  >
                    <Link className="ato signupa" href="/user/login">
                      Already have an account? &nbsp;
                      <span
                        className={"signup_txt cursor-pointer"}
                        onClick={() => router.push("/user/login")}
                      >
                        Login
                      </span>
                    </Link>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Next
                  </button>
                  <div className="form_field_wrapper mt-2 ">
                    <Link className="ato" href="/">
                      Back to Home page?
                    </Link>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default SignUp;
SignUp.Layout = "front";
