import React from "react";
import Image from "next/image";
import style from "./header.module.scss";
import headerlogo from "../../../../../../public/assets/img/logo.png";
import loginauth from "../../../../../../public/assets/img/login_auth.png";
import Link from "next/link";
const Header = () => {
  return (
    <main className="main_wrapper">
      <header className={`header ${style.header}`}>
        <div className={`header_inner ${style.header_inner}`}>
          <div className={`left_part ${style.left_part}`}>
            {" "}
            <Link href="/">
              <div className={`header_logo ${style.header_logo}`}>
                <Image
                  src={headerlogo}
                  alt="Header logo"
                  width={57}
                  height={67}
                  priority
                />
              </div>
            </Link>
          </div>
          <div className={`center_part ${style.center_part}`}>
            <div className={`login_auth_img ${style.login_auth_img}`}>
              <Image
                src={loginauth}
                alt="Login auth"
                width={110}
                height={110}
                priority
              />
            </div>
          </div>
          <div className={`right_part ${style.right_part}`}></div>
        </div>
      </header>
    </main>
  );
};

export default Header;
