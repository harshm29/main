import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { socketurl } from "../../../src/services";
const socket = io(socketurl);
import { MyPage } from "../../../src/components/common/types";
import Head from "next/head";
import Image from "next/image";
import style from "./consultrequest.module.scss";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Modal from "@mui/material/Modal";
import { showToast } from "../../../src/utils/comman";
import { useGetpoll, useCreateVote } from "../../../src/hooks/vote/useVote";

import CircularProgress from "@mui/material/CircularProgress";
const Voteresquest: MyPage = () => {
  const [formats, setFormats] = React.useState<any>(() => []);
  const [others, setOthers] = React.useState(null);

  const [isData, setisData] = React.useState(false);
  const [Data, setData] = React.useState([]);

  const [poll_id, setpoll_id] = React.useState(null);
  const [nominee_id, setnominee_id] = React.useState(null);

  const { Getpoll }: any = useGetpoll();
  const { CreateVote }: any = useCreateVote();

  useEffect(() => {
    // Socket.io event handling
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    socket.on("newPoll", (data: any) => {
      GetData();
    });
    // Add other event handlers as needed

    return () => {
      // Clean up event listeners when component unmounts
      socket.disconnect();
    };
  }, []); // Run effect only once on component mount

  const GetData = () => {
    Getpoll().then((res: any) => {
      console.log(res);
      setisData(res.status);
      if (res.status) {
        if (res.data.poll) {
          setpoll_id(res.data.poll._id);
        }

        setData(res.data);
      } else {
        setData([]);
      }
    });
  };

  useEffect(() => {
    GetData();
  }, []);

  const handleFormat = (event: any, newFormats: any) => {
    console.log(event.target, event.target.value);
    setnominee_id(event.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (poll_id && nominee_id) {
      CreateVote(poll_id, nominee_id).then((res: any) => {
        if (res.status) {
          GetData();
          showToast(res.message);
          socket.emit("vote", { poll_id, nominee_id });
        } else {
          showToast(res.message);
        }
      });
    } else {
      showToast("Please select any one nominee!");
    }
  };

  return (
    <>
      <Head>
        <title>Vote resquest</title>
        <meta name="description" content="Vote resquest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_wrapper">
        <div className={`userauth consultnine ${style.consult_request}`}>
          {!isData && (
            <div className="userauth_inner">
              <h1 className="auth_title">
                <span> Thank you for visiting us.</span>
              </h1>

              <div className={`form_wrapper ${style.form_wrapp}`}>
                <form>
                  <fieldset>
                    <div className="form_field_wrapper">
                      <label
                        className={`${style.custom_label_text}`}
                        htmlFor="matching"
                      >
                        We are matching you to any available poll now.
                      </label>
                      <br />
                      <CircularProgress disableShrink />
                    </div>

                    <div className="primary_btn"></div>
                  </fieldset>
                </form>
              </div>
            </div>
          )}

          <div className={`userauth_inner ${style.userauth_inner}`}>
            <h1 className={`auth_title ${style.auth_title}`}>
              <span>{isData ? Data?.poll?.question : ""} </span>
            </h1>
            {isData && (
              <div className={`form_wrapper ${style.form_wrapper}`}>
                <form className={style.form} noValidate>
                  <ToggleButtonGroup
                    className={`consult_item_wrapper ${style.consult_item_wrapper}`}
                    value={nominee_id}
                    onChange={handleFormat}
                    exclusive // Add the exclusive prop to allow only one selection
                    aria-label="text formatting"
                  >
                    {Data?.nominees.map((item: any) => (
                      <ToggleButton
                        key={item._id}
                        className={`consult_item ${style.consult_item}`}
                        value={item._id}
                        aria-label={item._id}
                      >
                        {item.name}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>

                  <div className={`primary_btn ${style.primary_btn}`}>
                    <button
                      type="button"
                      className={`btn btn-primary ${style.btn}`}
                      onClick={(e) => onSubmit(e)}
                    >
                      NEXT
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Voteresquest;
Voteresquest.Layout = "user";
