import React, { useState } from "react";
import style from "../../../../pages/patient/css/consultrequest.module.scss";
function InputFields({ inputname, onInputChange }) {
  const [inputList, setInputList] = useState([{ inputname: "" }]);

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index] = value;
    setInputList(list);
    onInputChange(list); // call callback function with updated inputList
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    onInputChange(list); // call callback function with updated inputList
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { inputname: "" }]);
  };

  return (
    <>
      {inputList.map((x, i) => {
        return (
          <div
            className={`form_field_wrapper ${style.form_field_wrapper}`}
            key={i + `${inputname}`}
          >
            <input
              type="text"
              placeholder={inputname}
              className={`form-control`}
              name={inputname}
              onChange={(e) => handleInputChange(e, i)}
            />

            <div className="btn-box">
              {inputList.length !== 1 && (
                <button
                  onClick={() => handleRemoveClick(i)}
                  className="btn btn-link btn_minus"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="3"
                    viewBox="0 0 13 3"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.8962 2.20763H1.10382C0.493037 2.20763 0 1.71312 0 1.10382C0 0.494509 0.493037 0 1.10382 0H11.8962C12.5055 0 13 0.494509 13 1.10382C13 1.71312 12.5055 2.20763 11.8962 2.20763Z"
                    />
                  </svg>
                </button>
              )}
              {inputList.length - 1 === i && (
                <button
                  className="btn btn-link btn_add"
                  onClick={handleAddClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path d="M12.3123 8.13335H8.19884V12.2112C8.19884 12.8677 7.66193 13.4 6.99961 13.4C6.33729 13.4 5.80038 12.8677 5.80038 12.2112V8.13335H1.68688C1.06909 8.06992 0.599609 7.55383 0.599609 6.93812C0.599609 6.32241 1.06909 5.80632 1.68688 5.74289H5.78748V1.67785C5.85146 1.06541 6.37206 0.600006 6.99316 0.600006C7.61426 0.600006 8.13487 1.06541 8.19884 1.67785V5.74289H12.3123C12.9301 5.80632 13.3996 6.32241 13.3996 6.93812C13.3996 7.55383 12.9301 8.06992 12.3123 8.13335Z" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        );
      })}

      {/* {inputList.map((x, i) => {
        return (
          <div className="box" key={i}>
            <input
              name={inputname}
              placeholder="Enter First Name"
              value={x.firstName}
              onChange={(e) => handleInputChange(e, i)}
            />

            <div className="btn-box">
              {inputList.length !== 1 && (
                <button className="mr10" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && (
                <button onClick={handleAddClick}>Add</button>
              )}
            </div>
          </div>
        );
      })} */}
    </>
  );
}

export default InputFields;
