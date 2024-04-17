import Head from "next/head";
import Image from "next/image";
import email_img from "../../public/assets/img/email.svg";
import Link from "next/link";
import { useState } from "react";

import { MyPage } from "../../src/components/common/types";
import { useForgotpwd } from "../../src/hooks/auth/useLogin";
import { useForm } from "react-hook-form";
import Header from "../../src/components/common/Layouts/frontend/user/Header";
import Footer from "../../src/components/common/Layouts/frontend/user/Footer";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
const Forgotpassword: MyPage = () => {
  const router: any = useRouter();
  const [email, setEmail] = useState("");
  const { forgotpwd } = useForgotpwd();

  const {
    register,
    handleSubmit,
    formState: { errors },
  }: any = useForm();

  const onSubmit = (e: any) => {
    const { email } = e;

    forgotpwd(email, "user")
      .then((res: any) => {
        if (res.status) {
          if (res.status) {
            setEmail("");
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
            router.push("/user/login");
          } else {
            toast.info(res.message, {
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
        } else {
          toast.warn(res.message, {
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
        <title>Admin Forgot password</title>
        <meta name="description" content="Forgot your password of the system" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_wrapper">
        <Header />

        <div className="userauth">
          <div className="userauth_inner">
            <h1 className="auth_title">
              {/* Forgot your <strong>Password ?</strong> */}
              Reset Password via <strong>Email?</strong>
            </h1>
            <div className="form_wrapper">
              <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
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
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`form-control field_with_icon ${
                        errors?.email?.message ? "border border-danger" : ""
                      }`}
                      required
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                          message: "Please enter a valid email",
                        },
                      })}
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

                  <button type="submit" className="btn btn-primary">
                    Send Email
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
export default Forgotpassword;
Forgotpassword.Layout = "front";
