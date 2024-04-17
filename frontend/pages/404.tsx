import React from "react";
import { MyPage } from "../src/components/common/types";
const Custom404: MyPage = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-primary">
      <h1 className="display-1 fw-bold text-white">404</h1>
    </div>
  );
};

export default Custom404;
Custom404.Layout = "front";
