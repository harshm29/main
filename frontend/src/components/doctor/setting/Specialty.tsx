import React from "react";
import { toast } from "react-toastify";
import style from "../../../components/common/css/setting.module.scss";
import Link from "next/link";
import hashtag from "../../../../public/assets/img/hashtag.svg";
import nricdoc from "../../../../public/assets/img/nric_doc.png";
import Image from "next/image";
import Modal from "@mui/material/Modal";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import drug from "../../../../public/assets/img/drug.svg";
import { useUpdateNricDetails } from "../../../hooks/consult/useConsult";
import { useUserinfo } from "../../../hooks/auth/useLogin";
import axios from "axios";
import {
  useCreateSpecialty,
  useListSpecialty,
  useDeleteSpecialty,
} from "../../../hooks/specialty/useSpecialty";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCurrentUser } from "../../../hooks/auth/useCurrentUser";
type Inputs = {
  text: string;
};
import {
  showToast,
  validateNRICNumber,
  validatePhoneNumber,
} from "../../../utils/comman";
const Specialty = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  }: any = useForm();
  const { userinfo } = useUserinfo();
  const [User, setUser] = React.useState([]);

  React.useEffect(() => {
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
    Getuser();
  }, []);

  // Add Allergies
  const { updateNricData }: any = useUpdateNricDetails();
  const { createSpecialty } = useCreateSpecialty();
  const { listSpecialty } = useListSpecialty();
  const { deleteSpecialty } = useDeleteSpecialty();

  const [SpecialtyList, setSpecialtyList] = React.useState([]);
  const { user: currentUser }: any = useCurrentUser();
  const [SpecialtyListerror, setSpecialtyListerror] = React.useState("");

  const [Allergiesopen, setAllergiesOpen] = React.useState(false);
  const handleAllergiesOpen = () => {
    setAllergiesOpen(true);
    reset({
      text: "",
    });
  };
  const handleAllergiesClose = () => {
    setAllergiesOpen(false);
    reset({
      text: "",
    });
  };
  const findList = () => {
    listSpecialty()
      .then((res) => {
        if (res) {
          setSpecialtyList(res.data);
          console.log(SpecialtyList);
          setSpecialtyListerror("");
        } else {
          setSpecialtyListerror(res.message);
        }
      })
      .catch((error) => {
        setSpecialtyListerror(error);
      });
  };
  const SpecialtyDlt = (id: any) => {
    console.log(id);
    deleteSpecialty(id)
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
          findList();
        } else {
          toast.error(res.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((error) => {
        toast.error(error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  React.useEffect(() => {
    findList();
  }, []);
  const onSubmitNew = (data: any) => {
    createSpecialty(data.text)
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
          handleAllergiesClose();
          findList();
        } else {
          toast.error(res.message, {
            position: "top-right",
            autoClose: 5000,
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
  };

  //End Allergies
  // NRIC
  const [NRICopen, setNRICOpen] = React.useState(false);
  const handleNRICOpen = () => setNRICOpen(true);
  const handleNRICClose = () => setNRICOpen(false);
  const [nricDetails, setNricDetails] = React.useState({
    nric: "",
    nricFile: "",
  });

  // Update the nric details
  const updateNricDetails = () => {
    if (nricDetails?.nric !== "" || nricDetails?.nricFile !== "") {
      let payloadData = {
        user_id: currentUser?.user?._id,
        NRIC: nricDetails?.nric,
        NRIC_file: nricDetails?.nricFile,
      };

      if (validateNRICNumber(nricDetails?.nric)) {
        updateNricData(payloadData).then((res: any) => {
          if (res.status) {
            console.log("upadted nric", res);
            showToast(res.message);
            handleNRICClose();
          } else {
            showToast(res.message);
          }
        });
      } else {
        showToast("Please enter the correct NRIC number!");
      }
    } else {
      showToast("Please fill the form!");
    }
  };

  const S3_BUCKET = process.env.S3_BUCKET || "OLPSS3";
  const REGION = process.env.REGION || "us-east-1";
  const BUCKET_URL = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/`;
  //  https://OLPSs3.s3.amazonaws.com
  // *************************************************
  const uploadFile = async (file: any) => {
    console.log("here we are uploading ....", file);

    let formData = new FormData();
    formData.append("file", file);

    let data: any = await axios.post("/api/s3/uploadFile", {
      name: file?.name,
      type: file?.type,
      data: JSON.stringify(file),
    });
    const url = data.url;
    console.log("url here --------------", data, url);
    setNricDetails({
      ...nricDetails,
      nricFile: `${BUCKET_URL}${file.name}`,
    });
  };
  // handle nric image change
  const imageChangeHandler = (e: any) => {
    console.log("file uplaoded", e.target.files);
    uploadFile(e.target.files[0]);
  };

  return (
    <>
      <div className={`card ${style.card} ${style.allergies_card}`}>
        <div className={`top_bar ${style.top_bar}`}>
          <h4 className={`card_title ${style.card_title}`}>Specialty</h4>
          <Link
            className={`btn ${style.btn_add}`}
            href=""
            onClick={handleAllergiesOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M16.1127 8.67224H2.34375"
                stroke="#C992AE"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9.22266 15.5558V1.78687"
                stroke="#C992AE"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
        <div className={`bottom_bar ${style.bottom_bar}`}>
          <ul>
            {SpecialtyList?.map((item: any) => (
              <li key={item._id}>
                <div className={`title ${style.title}`}>{item.text}</div>
                <button
                  className={`btn ${style.btn_delete}`}
                  onClick={() => SpecialtyDlt(item._id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="20"
                    viewBox="0 0 20 22"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.0158 3.56727C19.4438 3.56727 19.8 3.92256 19.8 4.37466V4.79265C19.8 5.23375 19.4438 5.60005 19.0158 5.60005H0.785239C0.356246 5.60005 0 5.23375 0 4.79265V4.37466C0 3.92256 0.356246 3.56727 0.785239 3.56727H3.99252C4.64404 3.56727 5.21103 3.10417 5.3576 2.45078L5.52556 1.70058C5.78659 0.678693 6.64565 0 7.6288 0H12.1712C13.1437 0 14.0123 0.678694 14.2638 1.64668L14.4435 2.44968C14.589 3.10417 15.156 3.56727 15.8086 3.56727H19.0158ZM17.3905 18.8474C17.7253 15.7268 18.3116 8.31283 18.3116 8.23803C18.333 8.01143 18.2592 7.79693 18.1126 7.62423C17.9553 7.46253 17.7563 7.36684 17.537 7.36684H2.27943C2.05905 7.36684 1.84937 7.46253 1.70388 7.62423C1.55624 7.79693 1.4835 8.01143 1.4942 8.23803C1.49616 8.25177 1.5172 8.51293 1.55237 8.94954C1.7086 10.8891 2.14375 16.2912 2.42493 18.8474C2.62391 20.7306 3.85954 21.9142 5.64933 21.9571C7.03045 21.989 8.4533 22 9.90824 22C11.2787 22 12.6705 21.989 14.0944 21.9571C15.9462 21.9252 17.1808 20.7625 17.3905 18.8474Z"
                      fill="black"
                      fillOpacity="0.34"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Add Allergies Modal */}
      <Modal
        open={Allergiesopen}
        onClose={handleAllergiesClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal_block setting_modal add_allergies">
          <div className="modal_header">
            <div className="modal_title_wrapper">
              <h2 className="modal_title">Add Specialty</h2>
            </div>
          </div>
          <div className="modal_content">
            <form key={2} noValidate onSubmit={handleSubmit(onSubmitNew)}>
              <div className="form_field_wrapper">
                <Image
                  className="field_icon"
                  src={drug}
                  alt="Name"
                  width={16}
                  height={20}
                  priority
                />
                <input
                  type="text"
                  placeholder="Specialty"
                  {...register("text", {
                    required: "Specialty text is required",
                  })}
                  className={`form-control field_with_icon ${
                    errors?.text?.message ? "border border-danger" : ""
                  }`}
                  required
                />
                {errors?.text?.message ? (
                  <div className="text-danger pb-2" style={{ float: "left" }}>
                    {errors?.text?.message}
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="primary_btn">
                <button
                  className="btn btn-secondary"
                  onClick={handleAllergiesClose}
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

export default Specialty;
