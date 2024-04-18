import Image from "next/image";
import style from "../../css/header.module.scss";
import loginauth from "../../../../../public/assets/img/login_auth.png";
import profile from "../../../../../public/assets/img/call/img_avatar.png";
import menubar from "../../../../../public/assets/img/menu_bar.svg";

import { useCurrentUser } from "../../../../hooks/auth/useCurrentUser";

export default function Header() {
  const { user: currentUser } = useCurrentUser();
  console.log(currentUser?.username);
  return (
    <>
      <main className="main_wrapper">
        <header className={`header ${style.header}`}>
          <div className={`header_inner ${style.header_inner}`}>
            <div className={`left_part ${style.left_part}`}>
              <button
                className={`btn btn-light btn_close d-lg-none d-md-block ${style.btn_close}`}
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasExample"
                aria-controls="offcanvasExample"
                // onClick={() => router.push("/")}
              >
                <Image
                  src={menubar}
                  alt="Menu icon"
                  width={28}
                  height={26}
                  priority
                />
              </button>
            </div>
            <div className={`center_part ${style.center_part}`}>
              <div className={`login_auth_img ${style.login_auth_img}`}>
                <Image
                  src={loginauth}
                  alt="Login auth"
                  style={{ height: "110px", width: "110px" }}
                  width={110}
                  height={110}
                  priority
                />
              </div>
            </div>
            <div className={`right_part ${style.right_part}`}>
              <div style={{ height: "27px" }}></div>
              <div className={`user ${style.user} ${style.common_content}`}>
                <div
                  className={`profile_img ${style.profile_img}`}
                  // id="dropdownMenuButton1"
                  //data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Image
                    src={profile}
                    alt={currentUser?.username ? currentUser?.username : ""}
                    width={35}
                    height={35}
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </header>
      </main>
    </>
  );
}
