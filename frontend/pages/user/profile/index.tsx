import React, { useEffect, useState } from "react";
import { MyPage } from "../../../src/components/common/types";
import style from "../../../src/components/common/css/setting.module.scss";
import Image from "next/image";
import Head from "next/head";
import profile from "../../../public/assets/img/img_avatar.png";

import email from "../../../public/assets/img/email.svg";
import phone from "../../../public/assets/img/phone.svg";
import calendar from "../../../public/assets/img/calendar.svg";

import moment from "moment";

import { useUserinfo } from "../../../src/hooks/auth/useLogin";

const Setting: MyPage = () => {
  const { userinfo } = useUserinfo();

  const [user, setUser] = React.useState<any>([]);
  const Getuser = () => {
    userinfo()
      .then((res) => {
        if (res.status) {
          setUser(res.data);
        } else {
          setUser([]);
        }
      })
      .catch((e) => {
        setUser([]);
      });
  };
  React.useEffect(() => {
    Getuser();
  }, []);

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Profile" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_wrapper">
        <div className={`userauth ${style.setting}`}>
          <div className={`userauth_inner ${style.setting_inner}`}>
            <div className={`form_wrapper ${style.form_wrapper}`}>
              <div className={`main_title ${style.main_title}`}>Profile</div>
              <div className={style.form}>
                <div className={`row ${style.item_wrapper}`}>
                  <div className={`col-lg-12 ${style.item} ${style.item1}`}>
                    <div className={`card ${style.card} ${style.profile_card}`}>
                      <div className={`top_bar ${style.profile_top_bar}`}>
                        <div
                          className={`primary_btn ${style.primary_btn}`}
                        ></div>
                        <div className={`profile_img ${style.profile_img}`}>
                          <div
                            className={`form_field_wrapper ${style.form_field_wrapper}`}
                          >
                            <div
                              className={`form-control form_upload_control ${style.form_upload_control}`}
                            >
                              <div
                                className={`file_upload_control ${style.file_upload_control}`}
                              >
                                <Image
                                  className={`file_upload ${style.file_upload}`}
                                  src={profile}
                                  alt="File Upload"
                                  width={110}
                                  height={110}
                                  priority
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <h1 className={`profile_title ${style.profile_title}`}>
                          {user?.name ? user.name : ""}
                        </h1>
                      </div>
                      <div className={`bottom_bar ${style.bottom_bar}`}>
                        <ul>
                          {user?.email && (
                            <li>
                              <span className="li_icon">
                                <Image src={email} alt="Email" priority />
                              </span>
                              {user?.email ? user.email : ""}
                            </li>
                          )}

                          {user?.mobile && (
                            <li>
                              <span className="li_icon">
                                <Image src={phone} alt="Contact" priority />
                              </span>
                              {user?.mobile ? user.mobile : ""}
                            </li>
                          )}

                          {user?.dob && (
                            <li>
                              <span className="li_icon">
                                <Image
                                  src={calendar}
                                  alt="Date of Birth"
                                  priority
                                />
                              </span>
                              {user?.dob
                                ? moment(user.dob).utc().format("MM/DD/YYYY")
                                : ""}
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <style jsx>{`
        .userauth {
          padding: 30px 30px 30px;
        }
      `}</style>
    </>
  );
};

export default Setting;
Setting.Layout = "user";
