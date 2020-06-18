import React from 'react';
import './Avatar.scss';

import { Interpriner } from '../../../../assets/icons';

export const Avatar = (props: any) => {
  const { name, city, img } = props;
  return (
    <div className="Avatar-Container">
      <div className="Avatar-Container_Img">
        {img ? <img src={img}></img> : <Interpriner />}
      </div>

      <div className="Avatar-Container_Info">
        <div className="__BolderBoldFont">{name}</div>
        <div>{city ? city : 'Город'}</div>
      </div>
    </div>
  );
};

export default Avatar;
