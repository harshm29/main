import Header from "../../src/components/common/Layouts/frontend/user/Header";
import Footer from "../../src/components/common/Layouts/frontend/user/Footer";
import style from "../user/css/signup.module.scss";
import { MyPage } from "../../src/components/common/types";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";

import profile from "../../public/assets/img/profile.svg";
import email from "../../public/assets/img/email.svg";
import phone from "../../public/assets/img/phone.svg";
import password from "../../public/assets/img/password.svg";
import calendar from "../../public/assets/img/calendar.svg";
import { useCheckEmail, useRegister } from "../../src/hooks/auth/useRegister";

const SignUp: MyPage = () => {
  const router = useRouter();
  const { checkEmail } = useCheckEmail();
  const { userRegister } = useRegister();

  const schema = yup.object().shape({
    name: yup
      .string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name cannot exceed 100 characters")
      .matches(/^[a-zA-Z\s]+$/, "Please enter a valid Name"),
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required")
      .test("check-email", "Email already exists", async function (value) {
        if (!value) return true; // Skip if value is empty
        try {
          const emailExists = await checkEmail(value);

          if (emailExists.status) {
            return false; // Return true if email doesn't exist
          } else {
            return true; // Return true if email doesn't exist
          }
        } catch (error: any) {
          return false; // Assume email exists if API call fails
        }
      }),
    mobile: yup
      .string()
      .matches(/^91\d{10}$/, "Please enter a valid mobile number")
      .required("Mobile number is required"),
    voter_id: yup.string().required("Voter ID is required"),
    dob: yup
      .date()
      .required("Date of Birth is required")
      .test("is-adult", "You must be at least 18 years old", (value) => {
        const cutoffDate = new Date();
        cutoffDate.setFullYear(cutoffDate.getFullYear() - 18);
        return new Date(value) <= cutoffDate;
      }),
    gender: yup.string().required("Gender is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be 8 characters long and contain letters, numbers, and special characters"
      ),
    confim_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleRegister = async (data: any) => {
    const userData = { ...data, type: "user" };

    userRegister(userData)
      .then((res) => {
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
      })
      .catch((error: any) => {
        console.error("Error:", error);
        toast.error(error.message);
      });
  };

  return (
    <>
      <Head>
        <title>Sign up</title>
        <meta
          name="description"
          content="Sign up to participate in the upcoming election voting process. Ensure your voice is heard and contribute to shaping the future. Register now to make a difference!"
        />
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
                      placeholder="Email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                          message: "Please enter a valid email aadress",
                        },
                        validate: (value: any) => {
                          console.log(value);
                          // Custom validation logic here
                          if (value.trim() === "" || emailExist) {
                            return true; // Skip validation
                          }
                          return checkEmail(value); // Check email existence
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
                      {...register("voter_id", {
                        required: "VoterID is required",
                      })}
                      className={`form-control field_with_icon ${
                        errors?.voter_id?.message ? "border border-danger" : ""
                      }`}
                    />
                    {errors?.voter_id?.message ? (
                      <div
                        className="text-danger pb-2"
                        style={{ float: "left" }}
                      >
                        {errors?.voter_id?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form_field_wrapper">
                    <Image
                      className="field_icon"
                      src={calendar}
                      alt="DOB"
                      width={16}
                      height={20}
                      priority
                    />
                    <input
                      type="date"
                      placeholder="DOB"
                      id="DOB"
                      {...register("dob", {
                        required: "DOB is required",
                      })}
                      className={`form-control field_with_icon ${
                        errors?.dob?.message ? "border border-danger" : ""
                      }`}
                    />
                    {errors?.dob?.message ? (
                      <div
                        className="text-danger pb-2"
                        style={{ float: "left" }}
                      >
                        {errors?.dob?.message}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form_field_wrapper ">
                    <Image
                      className={`${
                        errors?.gender?.message
                          ? "field_icon_fspace"
                          : "field_icon"
                      }`}
                      src={profile}
                      alt="Calendar"
                      width={18}
                      height={20}
                      priority
                    />
                    <select
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
                    Save
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
