import React from "react";
import { toast } from "react-toastify";
import style from "../../../components/common/css/setting.module.scss";
import Link from "next/link";
import hashtag from "../../../../public/assets/img/hashtag.svg";
import nricdoc from "../../../../public/assets/img/nric_doc.png";
import Image from "next/image";
// import Modal from "@mui/material/Modal";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import calendar from "../../../../public/assets/img/calendar.svg";
// import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  nric: string;
  nric_file: string;
};
const Nric = () => {
  return (
    <div className={`card ${style.card} ${style.nric_card}`}>
      <div className={`top_bar ${style.top_bar}`}>
        <h4 className={`card_title ${style.card_title}`}>NRIC</h4>

        <Link
          className={`btn ${style.btn_edit}`}
          href=""
          onClick={handleNRICOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="16"
            viewBox="0 0 16 18"
            fill="none"
          >
            <path
              d="M15.1628 5.66544L6.3764 17.0279C5.97316 17.5439 5.37891 17.8341 4.74222 17.8449L1.24039 17.8879C1.04939 17.8879 0.890213 17.7589 0.847767 17.5761L0.0518984 14.1255C-0.086052 13.4912 0.0518984 12.8355 0.455138 12.3303L6.68413 4.26797C6.79025 4.13898 6.98126 4.11855 7.1086 4.21422L9.72966 6.29967C9.89944 6.43942 10.1329 6.51467 10.377 6.48242C10.8969 6.41792 11.2471 5.94493 11.1941 5.43969C11.1622 5.1817 11.0349 4.96671 10.8651 4.80546C10.812 4.76246 8.31832 2.76301 8.31832 2.76301C8.15914 2.63401 8.12731 2.39752 8.25465 2.23735L9.24152 0.957057C10.1541 -0.214663 11.7459 -0.322161 13.0299 0.699064L14.5049 1.87078C15.1097 2.34377 15.513 2.96726 15.6509 3.62299C15.8101 4.3443 15.6403 5.0527 15.1628 5.66544Z"
              fill="#92C9AD"
            />
          </svg>
        </Link>
      </div>
      <div className={`bottom_bar ${style.bottom_bar}`}>
        <div className={`form_field_wrapper ${style.form_field_wrapper}`}>
          <Image
            className="field_icon"
            src={hashtag}
            alt="NRIC Number"
            width={20}
            height={20}
            priority
          />
          <input
            type="text"
            readOnly
            value="NRIC45231"
            className="form-control field_with_icon"
          />
        </div>

        <div className={`form_field_wrapper ${style.form_field_wrapper}`}>
          <div
            className={`form-control form_upload_control ${style.form_upload_control}`}
          >
            <div className={`file_upload_control ${style.file_upload_control}`}>
              <Image
                className="file_upload"
                src={nricdoc}
                alt="Nric Doc"
                width={670}
                height={194}
                priority
              />
              <button className={`btn btn-light ${style.btn_change}`}>
                Change
              </button>
              <input
                className="file_upload_input"
                type="file"
                id="myFile"
                name="filename"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nric;
