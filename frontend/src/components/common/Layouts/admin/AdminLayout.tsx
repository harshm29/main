// components/common/AdminLayout.tsx
import React, { PropsWithChildren } from "react";
import AdminNavbar from "./AdminNavbar";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import style from "../../css/main.module.scss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Loading from "../../../../../pages/loading";
const AdminLayout = ({ children }: PropsWithChildren) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loader, setLoader] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let isLoggedIn = localStorage.getItem("adminLoggedIn");
    if (isLoggedIn) {
      setLoggedIn(true);
      setLoader(false);
    } else {
      router.push("/admin/login");
    }
  }, []);

  return (
    <>
      {loader ? (
        <Loading />
      ) : (
        <main className="main_wrapper">
          <div className={style.main_block}>
            <div className={style.sidebar_section}>
              <Sidebar />
            </div>
            <div className={style.main_section}>
              <div className={style.header}>
                <Header />
              </div>
              <div className="content">{children}</div>
              <div className={style.footer}>
                <Footer />
              </div>
            </div>
          </div>
        </main>
      )}
      <style jsx>{`
        .userauth {
          padding: 30px 30px 30px;
        }
      `}</style>
    </>
  );
};
export default AdminLayout;
