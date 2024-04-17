import React from "react";
import style from "../../css/footer.module.scss";
import moment from "moment";
const Footer = () => {
  return (
    <main className="main_wrapper">
      <footer className={`footer ${style.footer}`}>
        <div className={`copy_right ${style.copy_right}`}>
          © Copyright {moment().format("YYYY")} OLPS. All rights reserved.
        </div>
      </footer>
    </main>
  );
};

export default Footer;
