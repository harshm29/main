import Head from "next/head";
import styles from "../styles/Home.module.css";
import { MyPage } from "../src/components/common/types";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import Header from "../src/components/common/Layouts/frontend/user/Header";
import Footer from "../src/components/common/Layouts/frontend/user/Footer";

const Home: MyPage = () => {
  const router = useRouter();
  const [account, setAccount] = useState(null);
  const [nextbtn, Setnextbtn] = useState(true);
  const onOptionChange = useCallback((e: any) => {
    setAccount(e.target.value);
    Setnextbtn(false);
  }, []);

  const onNext = useCallback(() => {
    if (account === "yes") {
      router.push("/user/login");
    } else {
      router.push("/user/signup");
    }
  }, [router, account]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Online Live Polling System</title>
        <meta name="description" content="Online Live Polling System" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main_wrapper">
        <Header />
        <div className="userauth">
          <div className="userauth_inner">
            <h1 className="auth_title">
              Hey! <span>I'm Karen.</span>
              <br />
              Do you already have an OLPS Account?
            </h1>
            <div className="form_wrapper">
              <form noValidate>
                <fieldset>
                  <div className="form_field_wrapper">
                    <label className="custom_radiobtn" htmlFor="accountyes">
                      YES
                      <input
                        type="radio"
                        id="accountyes"
                        name="account"
                        value={"yes"}
                        checked={account === "yes"}
                        onChange={onOptionChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>

                  <div className="form_field_wrapper">
                    <label className="custom_radiobtn" htmlFor="accountno">
                      NO
                      <input
                        type="radio"
                        id="accountno"
                        name="account"
                        value={"no"}
                        checked={account === "no"}
                        onChange={onOptionChange}
                      />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="primary_btn">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={onNext}
                      disabled={nextbtn}
                    >
                      NEXT
                    </button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default Home;

Home.Layout = "front";
