import Image from "next/image";

import style from "../../css/header.module.scss";
import profile from "../../../../../public/assets/img/call/img_avatar.png";
import menubar from "../../../../../public/assets/img/menu_bar.svg";

import { useLogout } from "../../../../hooks/auth/useLogout";
import { useRouter } from "next/router";
import { useCurrentUser } from "../../../../hooks/auth/useCurrentUser";
export default function Header() {
  const { logout } = useLogout();
  const router = useRouter();
  const { user: currentUser } = useCurrentUser();
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
            <div className={`center_part ${style.center_part}`}></div>
            <div className={`right_part ${style.right_part}`}>
              <div
                className={`user ${style.user} ${style.common_content}`}
                style={{ height: "35px" }}
              >
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
