import React, { PropsWithChildren } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import style from "../../css/main.module.scss";

const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
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
    </>
  );
};
export default MainLayout;
