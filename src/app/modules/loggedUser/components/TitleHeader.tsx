import React from 'react';
import './TitleHeader.scss';

export const TitleHeader = ({ children }: any) => {
  return (
    <div className="TitleHeader-Container  __BolderBoldFont">{children}</div>
  );
};

export default TitleHeader;
