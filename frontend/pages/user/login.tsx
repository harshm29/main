import Head from "next/head";
import Image from "next/image";
import Header from "../../src/components/common/Layouts/frontend/user/Header";
import Footer from "../../src/components/common/Layouts/frontend/user/Footer";
import { MyPage } from "../../src/components/common/types";
import email_img from "../../public/assets/img/email.svg";
import password_img from "../../public/assets/img/password.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { useLogin } from "../../src/hooks/auth/useLogin";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const Login: MyPage = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Email is required"),

    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Password must be 8 characters long and contain letters, numbers, and special characters"
      ),
  });
  const {
    register,
    handleSubmit,

    formState: { errors },
  }: any = useForm({ resolver: yupResolver(schema) });

  const { login } = useLogin();

  const router = useRouter();

  const onSubmit = (data: any) => {
    login(data.email, data.password, "user")
      .then((res: any) => {
        if (res.status) {
          toast.success(res.message, {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          router.push("/user/vote");
        } else {
          toast.error(res.message, {
            position: "top-right",
            autoClose: 8000,
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
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login of the system" />

        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_wrapper">
        <Header />

        <div className="userauth">
          <div className="userauth_inner">
            <h1 className="auth_title">
              Welcome <span>Back</span>
            </h1>
            <div className="form_wrapper">
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                  <div className="form_field_wrapper">
                    <div className="form_field_wrapper">
                      <Image
                        className="field_icon"
                        src={email_img}
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
                        })}
                        className={`form-control field_with_icon ${
                          errors?.email?.message ? "border border-danger" : ""
                        }`}
                        required
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

                    <div className="form_field_wrapper password">
                      <Image
                        className="field_icon"
                        src={password_img}
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
                        })}
                        className={`form-control field_with_icon ${
                          errors?.password?.message
                            ? "border border-danger"
                            : ""
                        }`}
                        required
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

                    <div className="form_field_wrapper forgotpass">
                      <Link className="ato" href="/user/forgot-password">
                        Forgot password?
                      </Link>
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Login
                    </button>

                    <div className="form_field_wrapper mt-2 ">
                      <Link className="ato" href="/">
                        Back to Home page?
                      </Link>
                    </div>
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
export default Login;
Login.Layout = "front";
