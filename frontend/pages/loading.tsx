import React from "react";
import { Bars } from "react-loader-spinner";
const Loading = () => {
  return (
    <>
      <div className="overrelay">
        <Bars
          height="50"
          width="50"
          color="#C992AE"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass="custom_loader"
          visible={true}
        />
      </div>
    </>
  );
};

export default Loading;
