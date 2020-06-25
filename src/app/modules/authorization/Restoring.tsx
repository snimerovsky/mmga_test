import React from "react";
import "../landing-home/Modering.scss";
import { Footer } from "../../../ui/footer";
import { Header } from "../../../ui/header";

export const Restoring = () => {
  return (
    <div className="Modering">
      <div className="Modering-Header">
        <Header />
      </div>

      <div className="Modering-Container">
        <div>
          На ваш почтовый ящик отправлено письмо со ссылкой восстановления
          пароля.
        </div>
      </div>
      <div className="Modering-Footer">
        <Footer />
      </div>
    </div>
  );
};

export default Restoring;
