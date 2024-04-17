import Image from "next/image";

import style from "../../css/header.module.scss";

import loginauth from "../../../../../public/assets/img/login_auth.png";

import menubar from "../../../../../public/assets/img/menu_bar.svg";

import { useLogout } from "../../../../hooks/auth/useLogout";

export default function Header() {
  const { logout } = useLogout();

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
                  // width={110}
                  // height={110}
                  // priority
                />
              </div>
            </div>
            <div className={`right_part ${style.right_part}`}>
              <div style={{ height: "27px" }}></div>
              <div className={`user ${style.user} ${style.common_content}`}>
                {/* <div
                  className={`profile_img ${style.profile_img}`}
                  // id="dropdownMenuButton1"
                  //data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <Image
                    src={profile}
                    alt="Profile"
                    width={35}
                    height={35}
                    priority
                  />
                </div> */}

                {/* <ul
                  className="profile dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <a className="dropdown-item">
                      <span className="item_text">Profile</span>
                    </a>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        logout();
                        router.push("/patient/login");
                      }}
                    >
                      <span className="item_text">Logout</span>
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
        </header>
      </main>
    </>
  );
}
