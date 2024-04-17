import React, { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import PaginationComp from "../pagination";
import Link from "next/link";
import Modal from "@mui/material/Modal";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { MyPage } from "../../../src/components/common/types";
import {
  useGetlist,
  useCreatePoll,
  useViewPoll,
} from "../../../src/hooks/poll/usePoll";

import moment from "moment-timezone";
moment.tz.setDefault("Asia/Kolkata");
import { toast } from "react-toastify";

import profile from "../../../public/assets/img/img_avatar.png";
import name_img from "../../../public/assets/img/profile.svg";
import email from "../../../public/assets/img/email.svg";
import phone from "../../../public/assets/img/phone.svg";
import calendar from "../../../public/assets/img/calendar.svg";
import location from "../../../public/assets/img/location.svg";
import hashtag from "../../../public/assets/img/hashtag.svg";

import PostalCodePicker from "../../../src/components/common/PostalCodePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  name: string;
  email: string;
  mobile: string;
  unit: string;
  //mcr: string;
  //address: string;
};
import { validateNRICNumber } from "../../../src/utils/comman";

const Poll: MyPage = () => {
  const router = useRouter();

  const [UserListdata, setUserListdata] = useState([]);
  const [Page, setPage] = useState(1);
  const [Limit, setLimit] = useState(10);
  const [Pagetotal, setPagetotal] = useState(0);
  const { Getlist }: any = useGetlist();

  const [Keyword, SetKeyword] = useState(null);
  const GetList = async (Limit: number, Page: number) => {
    Getlist(Page, Limit).then((res: any) => {
      if (res.status) {
        setUserListdata(res.data);
        setPagetotal(res.totalPages);
      } else {
        setUserListdata([]);
        setPagetotal(0);
      }
    });
  };

  useEffect(() => {
    GetList(Limit, Page);
  }, [Keyword]);

  const handlePagingChange = (num: number) => {
    setPage(num);
    GetList(Limit, num);
  };
  const calculateSerialNumber = (index: any) => {
    return (Page - 1) * Limit + index + 1;
  };

  return (
    <>
      <Head>
        <title>Doctor Management</title>
        <meta name="description" content="Doctors" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main_wrapper">
        <div className="userauth doctor_portal history">
          <div className="userauth_inner">
            <div className="top_bar">
              <div className="left_part">
                <div className={`main_title `}>Poll Management</div>
              </div>
              <div className="right_part"></div>
            </div>
            <div className="bottom_bar">
              <div className="pb-4">
                <Link title="Add Doctor" href={"/admin/doctors/add"}>
                  <svg
                    style={{ float: "right" }}
                    width="43"
                    height="43"
                    viewBox="0 0 43 43"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="21.5" cy="21.5" r="21.5" fill="#F4F6F5" />
                    <path
                      d="M30 19.5342H22.4658V12H19.5342V19.5342H12V22.4658H19.5342V30H22.4658V22.4658H30V19.5342Z"
                      fill="#00AEAD"
                    />
                  </svg>
                </Link>
              </div>
              <div className="table_wrapper">
                <div className="table_inner">
                  <TableContainer component={Paper}>
                    <Table
                      sx={{ minWidth: 650 }}
                      aria-label="simple table"
                      className="table table-hover"
                    >
                      <TableHead>
                        <TableRow>
                          <TableCell>S/N</TableCell>

                          <TableCell>Question</TableCell>

                          <TableCell>CreatedAt</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {UserListdata?.length ? (
                          UserListdata?.map((row: any, index: number) => (
                            <TableRow
                              key={row._id}
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                              }}
                            >
                              <TableCell component="th" scope="row">
                                {calculateSerialNumber(index)}
                              </TableCell>

                              <TableCell>
                                {row?.question ? row?.question : "--"}
                              </TableCell>

                              <TableCell>
                                {moment(row.createdAt)
                                  .tz("Asia/Kolkata")
                                  .format("D MMMM YYYY - hh:mm A")}
                              </TableCell>

                              <TableCell>
                                <Link
                                  className="action_link ms-1"
                                  href={`/admin/poll/view/${row?._id}`}
                                  title="View poll"
                                >
                                  <svg
                                    width="43"
                                    height="43"
                                    viewBox="0 0 43 43"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <circle
                                      cx="21.5"
                                      cy="21.5"
                                      r="21.5"
                                      fill="#F4F6F5"
                                    />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M17.0123 21.2C17.0123 23.6533 19.0206 25.6495 21.5001 25.6495C23.9684 25.6495 25.9767 23.6533 25.9767 21.2C25.9767 18.7355 23.9684 16.7394 21.5001 16.7394C19.0206 16.7394 17.0123 18.7355 17.0123 21.2ZM28.0971 14.353C30.0605 15.8696 31.7322 18.0887 32.9327 20.8655C33.0224 21.0773 33.0224 21.3227 32.9327 21.5234C30.5317 27.0768 26.2571 30.4 21.5 30.4H21.4888C16.7429 30.4 12.4683 27.0768 10.0673 21.5234C9.97756 21.3227 9.97756 21.0773 10.0673 20.8655C12.4683 15.312 16.7429 12 21.4888 12H21.5C23.8785 12 26.1337 12.8252 28.0971 14.353ZM21.5012 23.9743C23.0383 23.9743 24.2949 22.7253 24.2949 21.1975C24.2949 19.6586 23.0383 18.4096 21.5012 18.4096C21.3666 18.4096 21.2319 18.4208 21.1085 18.4431C21.0636 19.6698 20.0539 20.6511 18.8085 20.6511H18.7524C18.7188 20.8295 18.6963 21.008 18.6963 21.1975C18.6963 22.7253 19.9529 23.9743 21.5012 23.9743Z"
                                      fill="#00AEAD"
                                    />
                                  </svg>
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={8}>
                              Poll not available!!.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
                <PaginationComp
                  count={Pagetotal}
                  handleChange={(number: any) => handlePagingChange(number)}
                ></PaginationComp>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Poll;
Poll.Layout = "admin";
