import * as React from "react";
import Head from "next/head";
import Image from "next/image";

import { useViewPoll } from "../../../../src/hooks/poll/usePoll";

import style from "./setting.module.scss";
import Link from "next/link";
import { MyPage } from "../../../../src/components/common/types";
import signature from "../../../../public/assets/img/signature.svg";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useNomineesChartbyID } from "../../../../src/hooks/vote/useVote";
import { Chart } from "chart.js/auto";
import io from "socket.io-client";
import { socketurl } from "../../../../src/services";
const socket = io(socketurl);

const ViewPoll: MyPage = () => {
  const [data, setData] = useState<any>(null);
  const [nominees, setnominees] = useState<any>(null);
  const router = useRouter();
  const { ViewPoll }: any = useViewPoll();
  const [profilepic, setProfilepic] = useState<any>(null);
  const { id } = router.query;

  const fetchdoctorDetails = async (pid: any) => {
    if (pid) {
      ViewPoll(pid).then((response: any) => {
        if (response.status) {
          console.log(response);
          setData(response?.data);
          setnominees(response?.nominees);
        } else {
          setData([]);
          setnominees([]);
        }
      });
    }
  };

  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRef = React.createRef();
  const { NomineesChartbyID }: any = useNomineesChartbyID();

  const getData = (id: any) => {
    setLoading(true);
    NomineesChartbyID(id).then((res: any) => {
      console.log(res);
      if (res.status) {
        setChartData(res.data);
      } else {
        setChartData(null);
      }
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchdoctorDetails(id);
    getData(id);
  }, [id]);
  useEffect(() => {
    if (chartData) {
      const ctx = chartRef.current.getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: chartData,
        // options: {
        //   scales: {
        //     y: {
        //       beginAtZero: true,
        //     },
        //   },
        // },
        options: {
          indexAxis: "y",
        },
      });
    }
  }, [chartData]);
  useEffect(() => {
    socket.on("newVote", (data: any) => {
      getData(id);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <main className="main_wrapper">
        <div className={`userauth doctor_portal ${style.setting}`}>
          <div className={`userauth_inner ${style.setting_inner}`}>
            <div className={`form_wrapper ${style.form_wrapper}`}>
              <span
                onClick={() => router.back()}
                className={`main_title ${style.main_title}`}
                style={{ cursor: "pointer" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="27"
                  height="23"
                  viewBox="0 0 27 23"
                  fill="none"
                >
                  <path
                    d="M1.00013 11.0409L26 11.0409"
                    stroke="#371B2B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.084 21.0816L1.00071 11.0416L11.084 1"
                    stroke="#371B2B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
                {""}
                Poll Details : {data?.question ? data?.question : ""}
              </span>
              <form className={style.form}>
                <div className={`row ${style.item_wrapper}`}>
                  <div className={`col-lg-12 ${style.item} ${style.item2}`}>
                    <div
                      className={`card ${style.card} ${style.allergies_card}`}
                    >
                      <div className={`top_bar ${style.top_bar}`}>
                        <h4 className={`card_title ${style.card_title}`}>
                          Nominees
                        </h4>
                      </div>
                      <div className={`bottom_bar ${style.bottom_bar}`}>
                        <ul>
                          {nominees && (
                            <ul>
                              {nominees.map((item: any) => (
                                <li key={item._id}>
                                  <div className={`title ${style.title}`}>
                                    {item.name}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className={`dashboard_main_content ${style.dashboard}`}>
              <h2 className="main_page_title">chart</h2>
              <div className="row">
                <div className="col-md-12">
                  <div className={style.statistics}>
                    <div className="row">
                      {loading ? (
                        <p>Loading chart data...</p>
                      ) : chartData ? (
                        <div
                          className="chart-container"
                          style={{ width: "100%" }}
                        >
                          <canvas ref={chartRef}></canvas>
                        </div>
                      ) : (
                        <p>No chart data available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ViewPoll;
ViewPoll.Layout = "admin";
