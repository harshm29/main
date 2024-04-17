import React, { useEffect, useState } from "react";
import style from "../../../components/common/css/setting.module.scss";
import Image from "next/image";
import { toast } from "react-toastify";

import profile from "../../../../public/assets/img/img_avatar.png";
import name_img from "../../../../public/assets/img/profile.svg";
import email from "../../../../public/assets/img/email.svg";
import phone from "../../../../public/assets/img/phone.svg";
import calendar from "../../../../public/assets/img/calendar.svg";
import location from "../../../../public/assets/img/location.svg";

import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import dayjs from "dayjs";
import { useProfileupdate } from "../../../hooks/auth/useLogin";
import { useForm, SubmitHandler } from "react-hook-form";
import { useUserinfo } from "../../../hooks/auth/useLogin";
import { LocationPicker } from "../../../components/common/Address/locationPicker";
import {
  useDeleteImage,
  useUploadImage,
} from "../../../hooks/auth/useRegister";
import { showToast } from "../../../utils/comman";
type Inputs = {
  name: string;
  mobile: string;

  //address: string;
};
const Profile = () => {
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
  const { profileupdate } = useProfileupdate();
  const [open, setOpen] = React.useState(false);

  const [name, setName] = React.useState(
    user?.user_id?.name ? user.user_id.name : ""
  );
  const [mobile, setMobile] = React.useState(
    user?.user_id?.mobile ? user.user_id.mobile : ""
  );
  const [ndob, setnDob] = React.useState(
    user?.user_id?.dob ? user.user_id.dob : ""
  );
  const [address, setAddress] = React.useState(
    user?.address ? user.address : ""
  );
  const [inputData, setInputData] = React.useState<any>({
    newdob: "",
  });
  const handleOpen = () => {
    setOpen(true);
    setName(user?.user_id?.name ? user.user_id.name : "");
    setMobile(user?.user_id?.mobile ? user.user_id.mobile : "");
    setnDob(user?.user_id?.dob ? user.user_id.dob : "");
    setAddress(user?.address ? user.address : "");
  };
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    //const { newdob } = inputData;
    //console.log(newdob, address);
    if (ndob) {
      if (address) {
        profileupdate(data.name, data.mobile, ndob, address)
          .then((res: any) => {
            if (res.status == true) {
              toast.success(res.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              handleClose();
              Getuser();
            } else {
              toast.error(res.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          })
          .catch((e) =>
            toast.error(e, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            })
          );
      } else {
        toast.error(`Address is required!!`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } else {
      toast.error(`DOB is required!!`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // ************** Date handler **********************************
  const dateChangeHandler = (e: any) => {
    console.log(e.$d);
    const dobInput = moment(e.$d).format("YYYY-MM-DD");
    setnDob(dobInput);
  };

  console.log("user ----------------", user?.profile_pic);
  //  profile update handler *********************
  const updateProfileHandler = (data?: string) => {
    profileupdate(
      user?.user_id?.name,
      user?.user_id?.mobile,
      user?.user_id?.dob,
      user?.address,
      data
    )
      .then((res: any) => {
        if (res.status == true) {
          toast.success(res.message);
          handleClose();
          Getuser();
        } else {
          toast.error(res.message);
        }
      })
      .catch((e) => toast.error(e));
  };

  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    setProfileImage(user?.profile_pic !== undefined ? user?.profile_pic : "");
  }, [user]);

  const handleProfileImageChange = (evt: any) => {
    let formData = new FormData();
    formData.append("file", evt?.target?.files[0]);

    uploadAwsImage(formData).then((res: any) => {
      if (res?.status) {
        const url: any = res.data;
        setProfileImage(url);
        updateProfileHandler(res?.data);
      }
    });
  };

  const handleRemoveProfile = () => {
    let payload = profileImage;
    deleteAwsImage(payload).then((res: any) => {
      if (res.status) {
        updateProfileHandler("");
        setProfileImage("");
      } else {
        toast.error(res.message);
      }
    });
  };

  console.log("profileImage-----", profileImage);

  return (
    <>
      <div className={`card ${style.card} ${style.profile_card}`}>
        <div className={`top_bar ${style.profile_top_bar}`}>
          <div className={`primary_btn ${style.primary_btn}`}>
            <button
              className={`btn_edit ${style.btn_edit}`}
              onClick={handleOpen}
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
          <div className={`profile_img ${style.profile_img}`}>
            <div className={`form_field_wrapper ${style.form_field_wrapper}`}>
              <div
                className={`form-control form_upload_control ${style.form_upload_control}`}
              >
                <div
                  className={`file_upload_control ${style.file_upload_control}`}
                >
                  {profileImage ? (
                    <img
                      className={`file_upload ${style.file_upload}`}
                      src={profileImage}
                      alt="File Upload"
                      style={{ height: "110px", width: "110px" }}
                    />
                  ) : (
                    <Image
                      className={`file_upload ${style.file_upload}`}
                      src={profile}
                      alt="File Upload"
                      width={110}
                      height={110}
                      priority
                    />
                  )}
                  {profileImage === "" ? (
                    <div className={`upload_icon ${style.upload_icon}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M15.44 3.2364C15.48 3.30633 15.55 3.35627 15.64 3.35627C18.04 3.35627 20 5.3141 20 7.71143V13.6448C20 16.0422 18.04 18 15.64 18H4.36C1.95 18 0 16.0422 0 13.6448V7.71143C0 5.3141 1.95 3.35627 4.36 3.35627C4.44 3.35627 4.52 3.31632 4.55 3.2364L4.61 3.11654C4.64448 3.04397 4.67987 2.96943 4.71579 2.89376C4.97161 2.35492 5.25463 1.75879 5.43 1.40844C5.89 0.509434 6.67 0.0099889 7.64 0H12.35C13.32 0.0099889 14.11 0.509434 14.57 1.40844C14.7275 1.72308 14.9674 2.2299 15.1987 2.71839C15.2464 2.81921 15.2938 2.91924 15.34 3.01665L15.44 3.2364ZM14.7109 7.07214C14.7109 7.57158 15.1109 7.97114 15.6109 7.97114C16.1109 7.97114 16.5209 7.57158 16.5209 7.07214C16.5209 6.57269 16.1109 6.16315 15.6109 6.16315C15.1109 6.16315 14.7109 6.57269 14.7109 7.07214ZM8.2706 8.62042C8.7406 8.15094 9.3506 7.90121 10.0006 7.90121C10.6506 7.90121 11.2606 8.15094 11.7206 8.61043C12.1806 9.06992 12.4306 9.67924 12.4306 10.3285C12.4206 11.667 11.3406 12.7558 10.0006 12.7558C9.3506 12.7558 8.7406 12.5061 8.2806 12.0466C7.8206 11.5871 7.5706 10.9778 7.5706 10.3285V10.3185C7.5606 9.68923 7.8106 9.0799 8.2706 8.62042ZM12.7705 13.1054C12.0605 13.8147 11.0805 14.2542 10.0005 14.2542C8.95049 14.2542 7.97049 13.8446 7.22049 13.1054C6.48049 12.3563 6.07049 11.3774 6.07049 10.3285C6.06049 9.28969 6.47049 8.31077 7.21049 7.56161C7.96049 6.81244 8.95049 6.40289 10.0005 6.40289C11.0505 6.40289 12.0405 6.81244 12.7805 7.55162C13.5205 8.30078 13.9305 9.28969 13.9305 10.3285C13.9205 11.4173 13.4805 12.3962 12.7705 13.1054Z"
                          fill="#371B2B"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div
                      className="bg-danger p-1 rounded-pill"
                      style={{ cursor: "pointer" }}
                      title="Remove profile"
                      onClick={handleRemoveProfile}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                      >
                        <path d="M0 0h24v24H0z" fill="none" color="#fff" />
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                      </svg>
                    </div>
                  )}
                  {profileImage === "" ? (
                    <input
                      className={`file_upload_input ${style.file_upload_input}`}
                      type="file"
                      id="myFile"
                      onChange={handleProfileImageChange}
                      name="filename"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
          <h1 className={`profile_title ${style.profile_title}`}>
            {user?.user_id?.name ? user.user_id.name : ""}
          </h1>
        </div>
        <div className={`bottom_bar ${style.bottom_bar}`}>
          <ul>
            {user?.user_id?.email && (
              <li>
                <span className="li_icon">
                  <Image src={email} alt="Email" priority />
                </span>
                {user?.user_id?.email ? user.user_id.email : ""}
              </li>
            )}

            {user?.user_id?.mobile && (
              <li>
                <span className="li_icon">
                  <Image src={phone} alt="Contact" priority />
                </span>
                {user?.user_id?.mobile ? user.user_id.mobile : ""}
              </li>
            )}

            {user?.user_id?.dob && (
              <li>
                <span className="li_icon">
                  <Image src={calendar} alt="Date of Birth" priority />
                </span>
                {user?.user_id?.dob
                  ? moment(user.user_id.dob).format("MM/DD/YYYY")
                  : ""}
              </li>
            )}

            {user?.address && (
              <li>
                <span className="li_icon">
                  <Image src={location} alt="Location" priority />
                </span>
                {user?.address ? user.address : ""}
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal_block setting_modal edit_profile">
          <div className="modal_header">
            <div className="modal_title_wrapper">
              <h2 className="modal_title">Edit Profile</h2>
            </div>
          </div>
          <div className="modal_content">
            <form key={4} noValidate onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="Name"
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters long",
                    },
                    maxLength: {
                      value: 100,
                      message: "Name cannot exceed 100 characters",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/i,
                      message: "Please enter a valid Name",
                    },
                  })}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`form-control field_with_icon ${
                    errors?.name?.message ? "border border-danger" : ""
                  }`}
                  required
                />
                {errors?.name?.message ? (
                  <div className="text-danger pb-2" style={{ float: "left" }}>
                    {errors?.name?.message}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form_field_wrapper">
                <Image
                  className="field_icon"
                  src={phone}
                  alt="mobile number"
                  width={16}
                  height={20}
                  priority
                />
                <input
                  type="text"
                  min={0}
                  placeholder="65XXXXXXXX"
                  maxLength={10}
                  {...register("mobile", {
                    required: {
                      value: true,
                      message: "Please add your mobile phone number.",
                    },
                    pattern: {
                      value: /^65\d{8}$/,
                      message: "This is not a valid Singapore phone number.",
                    },
                    minLength: {
                      value: 10,
                      message: "The phone number is too short.",
                    },
                    maxLength: {
                      value: 11,
                      message: "The phone number is too long.",
                    },
                  })}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className={`form-control field_with_icon ${
                    errors?.mobile?.message ? "border border-danger" : ""
                  }`}
                  required
                />
                {errors?.mobile?.message ? (
                  <div className="text-danger pb-2" style={{ float: "left" }}>
                    {errors?.mobile?.message}
                  </div>
                ) : (
                  ""
                )}
              </div>
              {/* <div className="form_field_wrapper">
                <input type="number" className="form-control" />
              </div> */}
              <div className="form_field_wrapper date_picker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Image
                    className="field_icon"
                    src={calendar}
                    alt="Calendar"
                    width={18}
                    height={20}
                    priority
                  />
                  <DatePicker
                    defaultValue={dayjs(ndob)}
                    onChange={(e: any) => {
                      dateChangeHandler(e);
                    }}
                    disableFuture={true}
                  />
                </LocalizationProvider>
                {inputData?.dob === "Invalid date" || inputData?.dob === "" ? (
                  <div className="text-danger pb-2" style={{ float: "left" }}>
                    {"Date of birth is required"}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="form_field_wrapper">
                {/* <Image
                  className="field_icon"
                  src={location}
                  alt="Location"
                  width={16}
                  height={20}
                  priority
                /> */}

                <LocationPicker
                  handleSelect={(add: any) => {
                    setAddress(add);
                  }}
                  address={address}
                  setAddress={setAddress}
                />

                {/* <input
                  type="hidden"
                  placeholder="Address"
                  value={address}
                  required
                />
                {errors?.address?.message ? (
                  <div className="text-danger pb-2" style={{ float: "left" }}>
                    {errors?.address?.message}
                  </div>
                ) : (
                  ""
                )} */}
              </div>
              <div className="primary_btn">
                <button className="btn btn-secondary" onClick={handleClose}>
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

export default Profile;
