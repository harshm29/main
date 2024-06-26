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
    if (newNominees.length <= 10) {
      setNominees(newNominees);
      setError("");
    } else {
      setError("Maximum 10 nominees allowed");
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
    if (nominees.length <= 10) {
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
          You need to create a new poll. <br />
          <span>Please provide the details:</span>
        </h1>
        <div className="form_wrapper">
          <form>
            <fieldset>
              <div className="form_field_wrapper">
                <textarea
                  placeholder="Enter your question"
                  value={values.name}
                  className="form-control textarea_field"
                  name="name"
                  onChange={handleChange}
                />
              </div>
              <div className="form_field_wrapper">
                <TagsInput
                  inputProps={{
                    placeholder: "Enter nominees (Max 10)",
                  }}
                  value={nominees}
                  onChange={handleNomineesChange}
                  maxTags={10}
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
          Save
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
