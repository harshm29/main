import Head from "next/head";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useLogin, useVerifyotp } from "../src/hooks/auth/useLogin";
import { MyPage } from "../src/components/common/types";
import { toast } from "react-toastify";

const Login: MyPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/patient/login");
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");
  const [otp, setOtp] = useState("");
  const [Loginform, setLoginform] = useState(true);
  const [OTPform, setOTPform] = useState(false);
  const { login } = useLogin();
  const { verifyotp } = useVerifyotp();

  //   const [otp, setOtp] = useState("");
  // const [minutes, setMinutes] = useState(1);
  // const [seconds, setSeconds] = useState(30);

  const onSubmit = () => {
    if (!email || !password) {
      // MySwal.fire({
      //   title: "Error!",
      //   text: "Please enter email and password information!!",
      //   icon: "error",
      // });
      toast.error("Please enter email and password information!!")
    } else {
      login(email, password)
        .then((res: any) => {
          if (res.status) {
            if (res.id && res.acknowledged && res.modifiedCount) {
              setUserid(res.id);
              console.log("userDatails ::::::", res);
              let userDatails: any = {
                _id: res.id,
              };
              sessionStorage.setItem("userData", JSON.stringify(userDatails));
              setLoginform(false);
              // MySwal.fire({
              //   title: "Success!",
              //   text: res.message,
              //   icon: "success",
              // });
              toast.success(res?.message)
              setOTPform(true);
            } else {
              setLoginform(true);
              setOTPform(false);
              // MySwal.fire({
              //   title: "Error!",
              //   text: res.message,
              //   icon: "error",
              // });
              toast.error(res.message)
            }
          } else {
            setLoginform(true);
            setOTPform(false);

            // MySwal.fire({
            //   title: "Error!",
            //   text: res.message,
            //   icon: "error",
            // });
            toast.error(res?.message)
          }
        })
        .catch((e) =>
          // MySwal.fire({
          //   title: "Error!",
          //   text: e,
          //   icon: "error",
          // })
          toast.error(e)
        );
    }
  };
  const onVerify = () => {
    if (!otp || !userid) {
      alert("Please enter information");
    } else {
      verifyotp(otp, userid)
        .then((res: any) => {
          router.push("/profile");
        })
        .catch((e: any) =>
          // MySwal.fire({
          //   title: "Error!",
          //   text: e,
          //   icon: "error",
          // })
          toast.error(e)
        );
    }
  };
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {Loginform && (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="h-fit flex flex-col gap-2">
            <p className="text-2xl font-bold">Login Form</p>
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-80 h-8 px-2 border border-solid border-black rounded"
              placeholder="email"
            />
            <label className="mt-4">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-80 h-8 px-2 border border-solid border-black rounded"
              placeholder="password"
              type="password"
            />
            <button
              onClick={onSubmit}
              className="h-10 w-80 mt-8 bg-black rounded text-white"
            >
              Login
            </button>
          </div>
        </div>
      )}

      {OTPform && (
        <div className="w-screen h-screen flex items-center justify-center">
          <div className="h-fit flex flex-col gap-2">
            <p className="text-2xl font-bold">OTP Form</p>
            <label>OTP</label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-80 h-8 px-2 border border-solid border-black rounded"
              placeholder="OTP"
            />
            <button
              onClick={onVerify}
              className="h-10 w-80 mt-8 bg-black rounded text-white"
            >
              Verify
            </button>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
Login.Layout = "front";
