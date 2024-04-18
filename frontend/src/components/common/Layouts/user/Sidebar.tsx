import Image from "next/image";
import Link from "next/link";
import style from "../../css/sidebar.module.scss";
import sidebarlog from "../../../../../public/assets/img/logo.png";
import { useRouter } from "next/router";
import { useLogout } from "../../../../hooks/auth/useLogout";
export default function Sidebar() {
  const router = useRouter();
  const { logout } = useLogout();
  return (
    <>
      <main className="main_wrapper">
        <div className={`sidebar_main ${style.sidebar_main}`}>
          <div
            className={`offcanvas offcanvas-start ${style.offcanvas}`}
            tab-index="-1"
            id="offcanvasExample"
            aria-labelledby="offcanvasExampleLabel"
          >
            <div className={`offcanvas-header ${style.offcanvas_header}`}>
              <div className={`header_logo ${style.header_logo}`}>
                <Image
                  src={sidebarlog}
                  alt="Logo icon"
                  width={57}
                  height={67}
                  priority
                />
              </div>
            </div>

            <div className={`offcanvas-body ${style.offcanvas_body}`}>
              <div className={`inner_sidebar ${style.inner_sidebar}`}>
                <div className={`menu_list ${style.menu_list}`} id="sidebar">
                  <ul className="menu_list_main">
                    <li className="nav-item">
                      <Link
                        className={`menu_list_block ${style.menu_list_block}  ${
                          router.pathname == "/user/vote" ? style.active : ""
                        }`}
                        href="/user/vote"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="27"
                          height="31"
                          viewBox="0 0 27 31"
                          fill="none"
                        >
                          <path
                            opacity="0.5"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M21.9184 14.3577C22.7311 14.3577 23.3887 13.6987 23.3887 12.8848V9.94614C23.3887 9.36113 23.0453 8.85508 22.551 8.62151C22.3344 3.90067 18.4269 0.124512 13.6539 0.124512C8.88098 0.124512 4.97352 3.90043 4.75931 8.62151C4.26364 8.85509 3.91975 9.36115 3.91975 9.94614V12.8848C3.91975 13.6989 4.57902 14.3577 5.39028 14.3577H5.46453C6.27628 14.3577 6.93506 13.6987 6.93506 12.8848V9.94614C6.93506 9.36867 6.60178 8.87137 6.11674 8.63044C6.32628 4.65299 9.6268 1.48324 13.6543 1.48324C17.6822 1.48324 20.9832 4.65317 21.1925 8.63044C20.7084 8.87133 20.3751 9.36839 20.3751 9.94614V12.8848C20.3751 13.0805 20.4131 13.2615 20.4802 13.4319C19.6232 14.045 18.3754 14.4822 16.9704 14.6031C16.8113 14.3617 16.541 14.2003 16.2303 14.2003H15.0605C14.5726 14.2003 14.179 14.5948 14.179 15.0806C14.179 15.5669 14.5726 15.9633 15.0605 15.9633H16.2303C16.5716 15.9633 16.8622 15.7691 17.0086 15.4865C18.6396 15.3581 20.0585 14.8605 21.0546 14.1237C21.2828 14.2717 21.5536 14.3582 21.8458 14.3582H21.9189L21.9184 14.3577ZM13.2507 15.0801C13.2507 16.0778 14.0619 16.8896 15.0596 16.8896L16.229 16.8896C16.2587 16.8896 16.2875 16.8858 16.3163 16.882C16.3346 16.8796 16.353 16.8771 16.3716 16.8757C15.5415 17.4227 14.6237 17.7357 13.654 17.7357C11.1596 17.7357 8.99043 15.7184 7.86069 12.7429V9.94587C7.86069 9.26095 7.57478 8.62808 7.08594 8.18166C7.5059 4.90807 10.2996 2.41032 13.6539 2.41032C17.0091 2.41032 19.8031 4.90801 20.2212 8.1819C19.7333 8.62829 19.4472 9.26113 19.4472 9.94611V12.7408C19.418 12.8176 19.3866 12.8925 19.3552 12.9674L19.3552 12.9674L19.3552 12.9674L19.3277 13.0331C18.7493 13.318 18.0551 13.5273 17.3094 13.6315C17.0016 13.4012 16.6247 13.2728 16.2294 13.2728H15.0596C14.0617 13.2728 13.2507 14.0833 13.2507 15.0801ZM18.1912 30.5359H9.1162L9.11605 30.536H9.08289C4.23171 30.536 0.305158 30.5361 0.304688 25.682C0.304688 21.8919 2.6966 18.6633 6.05298 17.4197C5.76165 17.865 5.56767 18.3411 5.50356 18.7976C5.25324 18.9195 5.05596 19.1427 4.95721 19.4208C4.65244 19.5641 4.36088 19.7692 4.08959 20.031C3.62431 20.4791 3.20192 21.1023 2.86699 21.8327C2.7984 21.9838 2.79204 22.1544 2.84837 22.3112C2.51084 23.1734 2.32558 24.0766 2.32558 24.8608C2.32558 25.7199 2.36707 26.2234 2.59287 26.5864C2.83024 26.9687 3.21797 27.083 3.50882 27.1313C3.60852 27.2216 3.73769 27.2715 3.87109 27.2715H4.68073C4.9803 27.2715 5.22331 27.0278 5.22331 26.7278V26.6995L5.2226 26.6962C5.20657 26.4115 4.96851 26.1857 4.68072 26.1857H3.87012C3.78456 26.1857 3.7016 26.2052 3.62617 26.2427C3.40862 26.2026 3.37138 26.1421 3.35323 26.1124C3.23043 25.9167 3.22054 25.364 3.22054 24.8606C3.22054 24.2037 3.37539 23.4388 3.65823 22.6994C3.82063 22.6419 3.95474 22.5208 4.0271 22.3636C4.55556 21.2093 5.3098 20.4636 5.94903 20.4636C6.57578 20.4636 7.29489 21.1547 7.8271 22.267C7.89192 22.4034 8.00482 22.5116 8.14364 22.5731C8.45147 23.3378 8.62848 24.1679 8.62848 24.8606C8.62848 25.5029 8.60751 25.9349 8.50616 26.1101L8.50609 26.1102C8.4884 26.1406 8.45666 26.1952 8.26456 26.2354C8.19315 26.2027 8.11584 26.1857 8.03806 26.1857H7.22679C6.93217 26.1857 6.69057 26.4224 6.68421 26.7163L6.68397 26.7177L6.68374 26.7278C6.68374 27.0276 6.92769 27.2716 7.2275 27.2716H8.03876C8.18066 27.2716 8.31406 27.216 8.41541 27.1172C9.47114 26.9082 9.52512 26.1197 9.52512 24.8604C9.52512 24.0651 9.32831 23.1209 8.98253 22.2561C9.06196 22.0845 9.06196 21.8882 8.97947 21.7159C8.42205 20.5506 7.69822 19.7473 6.88291 19.3895C6.78816 19.147 6.62058 18.9485 6.40609 18.8283C6.53172 18.2218 7.02011 17.4636 7.70526 16.9861L7.75862 16.977L7.75872 16.977C7.80176 16.9695 7.84502 16.9621 7.88816 16.9559L7.90067 16.9545L7.90084 16.9545C7.91181 16.9533 7.92339 16.952 7.93436 16.9505C8.05739 16.934 8.18066 16.9194 8.30511 16.9083C8.30511 16.9154 8.30633 16.9224 8.30755 16.9295C8.30848 16.9349 8.30942 16.9403 8.30983 16.9458C8.31128 16.9738 8.31484 17.0015 8.31845 17.0296L8.31845 17.0296L8.31845 17.0296L8.32161 17.0547C8.34448 17.2607 8.4067 17.461 8.50263 17.6534C9.14941 19.2834 11.2443 22.3718 12.4787 24.1254L12.7325 20.4831C12.3724 20.298 12.0622 19.9926 11.8644 19.6374C11.7207 19.3821 11.6332 19.1033 11.6332 18.8197C11.6332 18.8197 12.5532 19.2282 13.4924 19.2282C13.5456 19.2282 13.5991 19.2259 13.6527 19.2235H13.6528H13.6528L13.6536 19.2235C13.7069 19.2258 13.7604 19.2282 13.8144 19.2282C14.7534 19.2282 15.6735 18.8197 15.6735 18.8197C15.6735 19.1031 15.5856 19.3819 15.4428 19.6374C15.2441 19.9924 14.9346 20.2978 14.5747 20.4831L14.8288 24.1254C16.0622 22.3714 18.1571 19.282 18.8039 17.6534C18.9008 17.4613 18.963 17.2607 18.9847 17.0547C18.9861 17.0419 18.9879 17.0292 18.9897 17.0167C18.993 16.9929 18.9963 16.9694 18.9974 16.9458C18.9974 16.9385 18.9986 16.9314 18.9999 16.9242C19.0008 16.9189 19.0017 16.9136 19.0021 16.9083C19.1261 16.9194 19.2501 16.934 19.3717 16.9505C19.3796 16.9516 19.3876 16.9526 19.3955 16.9535C19.4005 16.954 19.4054 16.9546 19.4102 16.9551L19.4176 16.9559C19.5994 16.9816 19.7799 17.0144 19.9576 17.0504C20.5344 17.5228 20.8939 18.2521 21.024 18.9146C20.4725 19.0273 19.9737 19.3747 19.6876 19.91C19.177 20.8636 19.5365 22.0516 20.4901 22.5618C21.4454 23.0728 22.6324 22.7131 23.1434 21.759C23.6547 20.8045 23.2943 19.617 22.3402 19.1064C22.2115 19.0381 22.0788 18.9862 21.9449 18.9483C21.89 18.5464 21.7698 18.1327 21.5843 17.7358C21.5526 17.6665 21.5164 17.6008 21.4802 17.5349L21.4801 17.5348L21.4606 17.4992C24.7078 18.7971 27.0014 21.9708 27.0014 25.6812C27.0014 30.536 23.0749 30.536 18.2243 30.5359H18.1912ZM21.4153 21.814C21.9565 21.814 22.3951 21.3754 22.3951 20.834C22.3951 20.2928 21.9565 19.8542 21.4153 19.8542C20.8741 19.8542 20.4353 20.2928 20.4353 20.834C20.4353 21.3754 20.8742 21.814 21.4153 21.814Z"
                          />
                        </svg>
                      </Link>
                    </li>

                    {/* <li className="nav-item">
                      <Link
                        className={`menu_list_block ${style.menu_list_block} ${
                          router.pathname == "/user/setting" ? style.active : ""
                        }`}
                        href="/user/setting"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="29"
                          viewBox="0 0 28 29"
                          fill="none"
                        >
                          <g opacity="0.5">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M25.9584 16.791C26.477 17.0665 26.8771 17.5015 27.1587 17.9365C27.707 18.8355 27.6625 19.9375 27.129 20.909L26.0918 22.649C25.5435 23.577 24.521 24.157 23.4689 24.157C22.9503 24.157 22.3724 24.012 21.8982 23.722C21.5129 23.4755 21.0683 23.3885 20.5941 23.3885C19.1271 23.3885 17.8972 24.592 17.8527 26.0275C17.8527 27.695 16.4895 29 14.7853 29H12.77C11.0511 29 9.68782 27.695 9.68782 26.0275C9.65818 24.592 8.42825 23.3885 6.96123 23.3885C6.47223 23.3885 6.02768 23.4755 5.65722 23.722C5.18303 24.012 4.59029 24.157 4.08647 24.157C3.01955 24.157 1.99708 23.577 1.4488 22.649L0.426329 20.909C-0.121951 19.9665 -0.151588 18.8355 0.396692 17.9365C0.633786 17.5015 1.07834 17.0665 1.58216 16.791C1.99708 16.588 2.26381 16.2545 2.51572 15.863C3.25664 14.616 2.81209 12.9775 1.55253 12.238C0.085506 11.4115 -0.388682 9.57 0.455965 8.1345L1.4488 6.4235C2.30826 4.988 4.14574 4.4805 5.62758 5.3215C6.91678 6.0175 8.59126 5.5535 9.34699 4.321C9.58409 3.915 9.71745 3.48 9.68782 3.045C9.65818 2.4795 9.82118 1.943 10.1027 1.508C10.651 0.609 11.6438 0.029 12.7256 0H14.815C15.9115 0 16.9044 0.609 17.4526 1.508C17.7194 1.943 17.8972 2.4795 17.8527 3.045C17.8231 3.48 17.9565 3.915 18.1936 4.321C18.9493 5.5535 20.6238 6.0175 21.9278 5.3215C23.3948 4.4805 25.2471 4.988 26.0918 6.4235L27.0846 8.1345C27.9441 9.57 27.4699 11.4115 25.988 12.238C24.7285 12.9775 24.2839 14.616 25.0397 15.863C25.2768 16.2545 25.5435 16.588 25.9584 16.791ZM9.58203 14.5145C9.58203 16.791 11.464 18.6035 13.7905 18.6035C16.1169 18.6035 17.9544 16.791 17.9544 14.5145C17.9544 12.238 16.1169 10.411 13.7905 10.411C11.464 10.411 9.58203 12.238 9.58203 14.5145Z"
                            />
                          </g>
                        </svg>
                      </Link>
                    </li> */}

                    <li className="nav-item">
                      <button
                        className={`menu_list_block ${style.menu_list_block}`}
                        onClick={() => {
                          logout().then((res: any) => {
                            router.push("/user/login");
                          });
                        }}
                        style={{ border: 0 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="31"
                          height="29"
                          viewBox="0 0 31 29"
                          fill="none"
                        >
                          <g opacity="0.5">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M11.4483 13.3835C10.8139 13.3835 10.3123 13.8765 10.3123 14.5C10.3123 15.109 10.8139 15.6165 11.4483 15.6165H20.2969V13.3838H26.2999L23.9799 11.0783C23.5449 10.6433 23.5449 9.93279 23.9799 9.49779C24.4149 9.04829 25.1254 9.04829 25.5604 9.48329L29.7944 13.7028C30.0119 13.9203 30.1279 14.1958 30.1279 14.5003C30.1279 14.7903 30.0119 15.0803 29.7944 15.2833L25.5604 19.5028C25.3429 19.7203 25.0529 19.8363 24.7774 19.8363C24.4874 19.8363 24.1974 19.7203 23.9799 19.5028C23.5449 19.0678 23.5449 18.3573 23.9799 17.9223L26.2999 15.6168H20.3V22.5475C20.3 26.1 17.3642 29 13.735 29H6.55029C2.93583 29 0 26.1145 0 22.562V6.4525C0 2.8855 2.95058 0 6.56504 0H13.7645C17.3642 0 20.3 2.8855 20.3 6.438V13.3835H11.4483Z"
                            />
                          </g>
                        </svg>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
