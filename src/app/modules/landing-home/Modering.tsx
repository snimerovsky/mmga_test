import React from "react";
import "./Modering.scss";
import { Footer } from "../../../ui/footer";
import { Header } from "../../../ui/header";

export const ModeringComp = () => {
  return (
    <div className="Modering">
      <div className="Modering-Header">
        <Header />
      </div>

      <div className="Modering-Container">
        <div className="">
          <p>Спасибо за регистрацию !</p>
          Ваша заявка находится на модерации. В ближайшее время мы направим вам
          письмо с инструкциями на почту.
        </div>
      </div>
      <div className="Modering-Footer">
        <Footer />
      </div>
    </div>
  );
};

export default ModeringComp;
