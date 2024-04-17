import Head from "next/head";
import Image from "next/image";
import email_img from "../../public/assets/img/email.svg";
import password_img from "../../public/assets/img/password.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";

import { MyPage } from "../../src/components/common/types";
import { useLogin } from "../../src/hooks/auth/useLogin";

import { useForm } from "react-hook-form";

import Header from "../../src/components/common/Layouts/frontend/user/Header";
import Footer from "../../src/components/common/Layouts/frontend/user/Footer";

const Login: MyPage = () => {
  const {
    register,
    handleSubmit,
    submit,
    formState: { errors },
  }: any = useForm();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");

  const [userDetails, setUserDetails] = useState<any>({});

  const { login } = useLogin();

  const router = useRouter();
  const [userErrors, setUserErrors] = useState<any>({
    email: [""],
    password: [""],
  });
  const onSubmit = (e: any) => {
    login(email, password, "user")
      .then((res: any) => {
        console.log(res, "res");
        setUserErrors({
          ...userErrors,
          email: res?.message?.email || "",
          password: res?.message?.password || "",
        });
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
              {/* Could you help me <span>login please?</span> */}
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
                        // {...register("email", {
                        //   required: "Email is required",
                        //   pattern: {
                        //     value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                        //     message: "Please enter a valid email",
                        //   },
                        // })}
                        defaultValue={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setUserErrors({
                            ...userErrors,
                            email: [""],
                          });
                        }}
                        className={`form-control field_with_icon ${
                          userErrors?.email?.[0] !== ""
                            ? "border border-danger"
                            : ""
                        }`}
                        required
                      />
                      {userErrors?.email?.[0] !== "" ? (
                        <div
                          className="text-danger pb-2"
                          style={{ float: "left" }}
                        >
                          {userErrors?.email?.[0]}
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
                        // {...register("password", {
                        //   required: "Password is required",
                        // })}
                        defaultValue={password}
                        // {...register("password", {
                        //   required: "Password is required",
                        // })}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setUserErrors({
                            ...userErrors,
                            password: [""],
                          });
                        }}
                        className={`form-control field_with_icon ${
                          userErrors?.password?.[0] !== ""
                            ? "border border-danger"
                            : ""
                        }`}
                        required
                      />
                      {userErrors?.password?.[0] !== "" ? (
                        <div
                          className="text-danger pb-2"
                          style={{ float: "left" }}
                        >
                          {userErrors?.password?.[0]}
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
