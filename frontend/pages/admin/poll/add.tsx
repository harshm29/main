import { MyPage } from "../../../src/components/common/types";
import Image from "next/image";
import { useRouter } from "next/router";
import profile from "../../../public/assets/img/profile.svg";
import { useState, useEffect } from "react";
import Email from "../../../public/assets/img/email.svg";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { useCreatePoll } from "../../../src/hooks/poll/usePoll";

import Link from "next/link";
import { toast } from "react-toastify";
import io from "socket.io-client";
import { socketurl } from "../../../src/services";
const socket = io(socketurl);

const AddPoll: MyPage = () => {
  const [errors, setErrors] = useState({});
  const router = useRouter();
  useEffect(() => {}, []);
  const [IsNominees, setIsNominees] = useState(false);
  const [nominees, setNominees] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Socket.io event handling
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    // Add other event handlers as needed

    return () => {
      // Clean up event listeners when component unmounts
      socket.disconnect();
    };
  }, []);

  const handleNomineesChange = (newNominees: any) => {
    if (newNominees.length <= 5) {
      setNominees(newNominees);
      setError("");
    } else {
      setError("Maximum 5 nominees allowed");
    }
  };

  const { CreatePoll } = useCreatePoll();
  const [values, setValues] = useState({
    name: "",
    email: "",
  });

  const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
      errors.name = "Required";
    } else if (values.name.length > 50) {
      errors.name = "Must be 50 characters or less";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    const newErrors = validate(newValues);
    setValues(newValues);
    setErrors(newErrors);
  };

  const onSubmit = () => {
    if (nominees.length <= 5) {
      CreatePoll(values.name, nominees)
        .then((res: any) => {
          toast.error(res.message);
          setError("");
          socket.emit("poll-created", values.name);
          router.push("/admin/poll");
        })
        .catch((e) => {
          if (e.response.data.message === "Email ID already exists.") {
            toast.error(e.response.data.message);
          } else {
            toast.error(e);
          }
        });
    } else {
      setError("Maximum 5 nominees allowed");
    }
  };
  const isButtonDisabled = !values.name;

  return (
    <div className="userauth signup">
      <div className="userauth_inner">
        <h1 className="auth_title">
          You need to create new poll so
          <br />
          <span>Give details please?</span>
        </h1>
        <div className="form_wrapper">
          <form>
            <fieldset>
              <div className="form_field_wrapper">
                <Image
                  className="field_icon"
                  src={profile}
                  alt="Profile"
                  width={16}
                  height={20}
                  priority
                />
                <input
                  type="text"
                  placeholder="question"
                  value={values.name}
                  className="form-control field_with_icon"
                  name="name"
                  onChange={handleChange}
                />
                {errors?.name && <div className="error">{errors?.name}</div>}
              </div>

              <div className="form_field_wrapper">
                <TagsInput
                  inputProps={{
                    className: "react-tagsinput-input",
                    classNameRemove: "react-tagsinput-remove",
                    placeholder: "Nominees",
                    maxTags: 5,
                  }}
                  value={nominees}
                  onChange={handleNomineesChange}
                  style={{ with: "100%" }}
                />
                {error && <div className="error">{error}</div>}
              </div>
            </fieldset>
          </form>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={onSubmit}
          disabled={isButtonDisabled}
        >
          Send
        </button>
        <span style={{ margin: "0 45px" }}></span>
        <Link href="/admin/poll">
          <button className="btn btn-primary">Cancel</button>
        </Link>
      </div>
    </div>
  );
};

export default AddPoll;
AddPoll.Layout = "admin";
