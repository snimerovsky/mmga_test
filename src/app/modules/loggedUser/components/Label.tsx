import React from 'react';
import './Label.scss';

export const Label = ({ children }: any) => {
  return (
    <div className="Label-Container">
      <span className="Label-Container_Text __BolderBoldFont">{children}</span>
      <div className="Label-Container_Border"></div>
    </div>
  );
};

export default Label;
