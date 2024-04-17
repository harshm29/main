import React, { useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import style from "../../../components/common/css/setting.module.scss";
// import Link from "next/link";
import { useUserinfoupdate } from "../../../hooks/auth/useLogin";
import Modal from "@mui/material/Modal";
import nricdoc from "../../../../public/assets/img/nric_doc.png";
import fileupload from "../../../../public/assets/img/fileupload.svg";
// import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
type Inputs = {
  nationality: string;
  education: string;
  clinic: string;
};
import { useRouter } from "next/router";
import { useUserinfo } from "../../../hooks/auth/useLogin";
import name_img from "../../../../public/assets/img/profile.svg";
import location from "../../../../public/assets/img/location.svg";
import { useDeleteImage, useUploadImage } from "../../../hooks/auth/useRegister";
const Userinfo = () => {
  const router = useRouter();
  const { userinfoupdate } = useUserinfoupdate();
  const { userinfo } = useUserinfo();

  const { uploadAwsImage }: any = useUploadImage();
  const { deleteAwsImage }: any = useDeleteImage();

  const [user, setUser] = React.useState<any>([]);
  const Getuser = () => {
    userinfo()
      .then((res) => {
        if (res.status) {
          console.log(res.data);
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

  const [MedicalHistoriesopen, setMedicalHistoriesOpen] = React.useState(false);
  const [MyNationality, setiMyNationality] = React.useState("");
  const [MyEducation, setiMyEducation] = React.useState("");
  const [MyClinic, setiMyClinic] = React.useState("");
  const [docDetails, setDocDetails] = React.useState("");
  const [SignDetails, setSignDetails] = React.useState("");

  const handleMedicalHistoriesOpen = () => {
    setMedicalHistoriesOpen(true);
    setiMyNationality(user.nationality ? user.nationality : "");
    setiMyEducation(user.education ? user.education : "");
    setSignDetails(user?.sign_file ? user?.sign_file : "")
    setDocDetails(user?.documents_file ? user?.documents_file : "" )
    if (user.clinic) {
      setiMyClinic(user.clinic ? user.clinic : "");
    }
  };
  const handleMedicalHistoriesClose = () => {
    setMedicalHistoriesOpen(false);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    userinfoupdate(
      data.nationality,
      data.education,
      data.clinic,
      docDetails,
      SignDetails
    )
      .then((res: any) => {
        if (res.status == true) {
          toast.success(res.message);
          handleMedicalHistoriesClose();
          Getuser();
        } else {
          toast.error(res.message);
        }
      })
      .catch((e) =>
        toast.error(e)
      );
  };

  // handle image change
  const imageChangeHandler = (evt: any, type: string) => {
    // uploadFile(e.target.files[0], "doc");
    let formData = new FormData();
    formData.append("file", evt?.target?.files[0]);

    if(type === 'sign') {
      uploadAwsImage(formData).then((res:any)=> {
        if(res?.status) {
          const url:any = res.data;
          setSignDetails(url);
        }
      });
    } else {
      uploadAwsImage(formData).then((res:any)=> {
        if(res?.status) {
          const url:any = res.data;
          setDocDetails(url);
        }
      });
    }
  };


  const handleRemoveProfile =(img:string, type: string)=> {
    let payload:any = img 
    deleteAwsImage(payload).then((res:any)=> {
      if(res.status) {
        if(type === 'sign') {
          setSignDetails("")
        } else {
          setDocDetails("")
        }
      } else {
        toast.error(res.message)
      }
    })
  }

  return (
    <>
      <div className={`card ${style.card} ${style.allergies_card}`}>
        <div className={`top_bar ${style.top_bar}`}>
          <h4 className={`card_title ${style.card_title}`}>User Information</h4>

          <button
            className={`btn ${style.btn_add}`}
            onClick={handleMedicalHistoriesOpen}
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
          </button>
        </div>
        <div className={`bottom_bar ${style.bottom_bar}`}>
          <ul>
            <li>
              <div className={`title ${style.title}`}>
                <b>Nationality:</b> {user.nationality ? user.nationality : ""}
              </div>
            </li>
            <li>
              <div className={`title ${style.title}`}>
                <b>Education:</b> {user.education ? user.education : ""}
              </div>
            </li>
            {user.clinic && (
              <li>
                <div className={`title ${style.title}`}>
                  <b>Clinic:</b> {user.clinic ? user.clinic : ""}
                </div>
              </li>
            )}
          </ul>

          <div className={`form_field_wrapper ${style.form_field_wrapper}`}>
            <div
              className={`form-control form_upload_control ${style.form_upload_control}`}
            >
              <h6>
                <b>Document:</b>
              </h6>
              <div
                className={`file_upload_control ${style.file_upload_control}`}
              >
                <img
                  className="file_upload"
                  src={ user?.documents_file || nricdoc}
                  alt="Document Doc"
                  style={{ width: '670px', height: '194px'}}
                  // width={670}
                  // height={194}
                  // priority
                />
              </div>
            </div>
          </div>
          <div className={`form_field_wrapper ${style.form_field_wrapper}`}>
            <div
              className={`form-control form_upload_control ${style.form_upload_control}`}
            >
              <h6>
                <b>Sign :</b>
              </h6>
              <div
                className={`file_upload_control ${style.file_upload_control}`}
              >
                 <img
                  className="file_upload"
                  src={ user?.sign_file || nricdoc}
                  alt="Sign Doc"
                  style={{ width: '670px', height: '194px'}}
                  // width={670}
                  // height={194}
                  // priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Medical Histories Modal */}
      <Modal
        open={MedicalHistoriesopen}
        onClose={handleMedicalHistoriesClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal_block setting_modal add_allergies">
          <div className="modal_header">
            <div className="modal_title_wrapper">
              <h2 className="modal_title">Update User Information</h2>
            </div>
          </div>
          <div className="modal_content">
            <form key={3} noValidate onSubmit={handleSubmit(onSubmit)}>
              <div className="form_field_wrapper">
                <Image
                  className="field_icon"
                  src={location}
                  alt="Location"
                  width={16}
                  height={20}
                  priority
                />
                <input
                  type="text"
                  placeholder="Nationality"
                  {...register("nationality", {
                    required: "nationality text is required",
                  })}
                  value={MyNationality}
                  onChange={(e) => setiMyNationality(e.target.value)}
                  className={`form-control field_with_icon ${
                    errors?.nationality?.message ? "border border-danger" : ""
                  }`}
                  required
                />
                {errors?.nationality?.message ? (
                  <div className="text-danger pb-2" style={{ float: "left" }}>
                    {errors?.nationality?.message}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form_field_wrapper">
                <Image
                  className="field_icon"
                  src={name_img}
                  alt="Name"
                  width={16}
                  height={20}
                  priority
                />
                <input
                  type="text"
                  placeholder="Education"
                  {...register("education", {
                    required: "education text is required",
                  })}
                  className={`form-control field_with_icon ${
                    errors?.education?.message ? "border border-danger" : ""
                  }`}
                  value={MyEducation}
                  onChange={(e) => setiMyEducation(e.target.value)}
                  required
                />
                {errors?.education?.message ? (
                  <div className="text-danger pb-2" style={{ float: "left" }}>
                    {errors?.education?.message}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form_field_wrapper">
                <Image
                  className="field_icon"
                  src={name_img}
                  alt="Clinic"
                  width={16}
                  height={20}
                  priority
                />
                <input
                  type="text"
                  placeholder="Clinic"
                  {...register("clinic", {
                    required: "clinic text is required",
                  })}
                  className={`form-control field_with_icon ${
                    errors?.clinic?.message ? "border border-danger" : ""
                  }`}
                  value={MyClinic}
                  onChange={(e) => setiMyClinic(e.target.value)}
                  required
                />
                {errors?.clinic?.message ? (
                  <div className="text-danger pb-2" style={{ float: "left" }}>
                    {errors?.clinic?.message}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <label className="control-label d-block m-auto text-start">
                <b>Document</b>
              </label>
              {docDetails === '' ? 
              <div className="form_field_wrapper">
                <Image
                  src={fileupload}
                  className="field_icon "
                  alt="Document"
                  width={16}
                  height={20}
                  priority
                />

                <input
                  type="file"
                  name="document"
                  onChange={(e: any) => imageChangeHandler(e, 'document')}
                  className="form-control field_with_icon"
                  placeholder="Document"
                />
              </div>
                :
                <div className="border px-2 py-1 rounded my-1 d-flex justify-content-between">
                  <div>
                    1 File selected
                  </div>
                  <div className="bg-danger p-1 rounded-pill" style={{ cursor: 'pointer' }} title="Remove" onClick={()=>handleRemoveProfile(docDetails, 'document')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                      <path d="M0 0h24v24H0z" fill="none" color="#fff" />
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                  </div>
                </div>
              }

              <label className="control-label d-block m-auto text-start">
                <b>Sign</b>
              </label>
              {SignDetails === '' ?
                <div className="form_field_wrapper">
                  <Image
                    src={fileupload}
                    className="field_icon "
                    alt="Document"
                    width={16}
                    height={20}
                    priority
                  />

                  <input
                    type="file"
                    name="sign"
                    onChange={(e: any) => imageChangeHandler(e, 'sign')}
                    className="form-control field_with_icon"
                    placeholder="sign"
                  />
                </div>
                :
                <div className="border px-2 py-1 rounded my-1 d-flex justify-content-between">
                  <div>
                    1 File selected
                  </div>
                  <div className="bg-danger p-1 rounded-pill" style={{ cursor: 'pointer' }} title="Remove" onClick={() => handleRemoveProfile(SignDetails, 'sign')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                      <path d="M0 0h24v24H0z" fill="none" color="#fff" />
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                    </svg>
                  </div>
                </div>
              }

              <div className="primary_btn">
                <button
                  className="btn btn-secondary"
                  onClick={handleMedicalHistoriesClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Userinfo;
