import React, { PropsWithChildren } from "react";
const FrontendLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};
export default FrontendLayout;
