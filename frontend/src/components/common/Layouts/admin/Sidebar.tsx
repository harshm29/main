import Image from "next/image";
import Link from "next/link";
import style from "../../css/sidebar.module.scss";
import sidebarlog from "../../../../../public/assets/img/logo.svg";
import { useRouter } from "next/router";
import { useLogout } from "../../../../../src/hooks/auth/useLogout";
export default function Sidebar() {
  const router = useRouter();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
    router.push("/admin/login");
  };

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
                    <li className="nav-item" title="Dashboard">
                      <Link
                        className={`menu_list_block ${style.menu_list_block}  ${
                          router.pathname == "/admin/dashboard"
                            ? style.active
                            : ""
                        }`}
                        href="/admin/dashboard"
                      >
                        <div className={`sidebar_icon ${style.sidebar_icon}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="29"
                            height="30"
                            viewBox="0 0 29 30"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M22.0109 3.99448C22.0109 2.06599 23.5769 0.5 25.5054 0.5C27.4338 0.5 28.9998 2.06599 28.9998 3.99448C28.9998 5.92297 27.4338 7.48896 25.5054 7.48896C23.5769 7.48896 22.0109 5.92297 22.0109 3.99448ZM16.4285 19.0008L20.619 13.5938L20.561 13.6228C20.793 13.3038 20.8365 12.8978 20.677 12.5353C20.5189 12.1728 20.1695 11.9263 19.7939 11.8973C19.401 11.8538 19.0109 12.0278 18.7775 12.3468L15.2699 16.8853L11.252 13.7243C11.0055 13.5358 10.7155 13.4619 10.4255 13.4923C10.137 13.5358 9.87596 13.6939 9.70051 13.9259L5.40998 19.5098L5.32153 19.6403C5.07503 20.1028 5.19103 20.6973 5.62603 21.0178C5.82903 21.1483 6.04653 21.2353 6.29303 21.2353C6.62798 21.2498 6.94552 21.0743 7.14852 20.8003L10.788 16.1153L14.9205 19.2198L15.051 19.3053C15.515 19.5518 16.095 19.4373 16.4285 19.0008ZM19.5024 3.08151C19.4444 3.444 19.4154 3.8065 19.4154 4.169C19.4154 7.43148 22.0544 10.069 25.3024 10.069C25.6649 10.069 26.0129 10.027 26.3754 9.96897V21.669C26.3754 26.5859 23.4754 29.5004 18.5454 29.5004H7.83141C2.89999 29.5004 0 26.5859 0 21.669V10.9405C0 6.01049 2.89999 3.08151 7.83141 3.08151H19.5024Z"
                            />
                          </svg>
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item" title="User poll">
                      <Link
                        className={`menu_list_block ${style.menu_list_block}  ${
                          router.pathname == "/admin/poll" ? style.active : ""
                        }`}
                        href="/admin/poll"
                      >
                        <div className={`sidebar_icon ${style.sidebar_icon}`}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="29"
                            height="30"
                            viewBox="0 0 29 30"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M22.0109 3.99448C22.0109 2.06599 23.5769 0.5 25.5054 0.5C27.4338 0.5 28.9998 2.06599 28.9998 3.99448C28.9998 5.92297 27.4338 7.48896 25.5054 7.48896C23.5769 7.48896 22.0109 5.92297 22.0109 3.99448ZM16.4285 19.0008L20.619 13.5938L20.561 13.6228C20.793 13.3038 20.8365 12.8978 20.677 12.5353C20.5189 12.1728 20.1695 11.9263 19.7939 11.8973C19.401 11.8538 19.0109 12.0278 18.7775 12.3468L15.2699 16.8853L11.252 13.7243C11.0055 13.5358 10.7155 13.4619 10.4255 13.4923C10.137 13.5358 9.87596 13.6939 9.70051 13.9259L5.40998 19.5098L5.32153 19.6403C5.07503 20.1028 5.19103 20.6973 5.62603 21.0178C5.82903 21.1483 6.04653 21.2353 6.29303 21.2353C6.62798 21.2498 6.94552 21.0743 7.14852 20.8003L10.788 16.1153L14.9205 19.2198L15.051 19.3053C15.515 19.5518 16.095 19.4373 16.4285 19.0008ZM19.5024 3.08151C19.4444 3.444 19.4154 3.8065 19.4154 4.169C19.4154 7.43148 22.0544 10.069 25.3024 10.069C25.6649 10.069 26.0129 10.027 26.3754 9.96897V21.669C26.3754 26.5859 23.4754 29.5004 18.5454 29.5004H7.83141C2.89999 29.5004 0 26.5859 0 21.669V10.9405C0 6.01049 2.89999 3.08151 7.83141 3.08151H19.5024Z"
                            />
                          </svg>
                        </div>
                      </Link>
                    </li>

                    <li className="nav-item" title="Logout">
                      <button
                        className={`menu_list_block ${style.menu_list_block}`}
                        onClick={() => {
                          logout().then((res: any) => {
                            console.log(res);
                            router.push("/admin/login");
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
