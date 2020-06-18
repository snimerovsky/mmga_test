import React from 'react';
import './Tutorial.scss';

import TitleHeader from '../components/TitleHeader';

import { Brain } from '../../../../assets/icons';

export const Tutorial = (props: any) => {
  return (
    <div className="Tutorial-Container">
      <TitleHeader>
        <Brain />
        <span>Обучение</span>
      </TitleHeader>
      <div className="user-wrapper"></div>
    </div>
  );
};

export default Tutorial;
