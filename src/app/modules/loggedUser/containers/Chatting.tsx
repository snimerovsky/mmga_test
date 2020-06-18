import React from 'react';
import './Chatting.scss';
import TitleHeader from '../components/TitleHeader';
import { Chat } from '../../../../assets/icons';

export const Chatting = (props: any) => {
  return (
    <div className="Chatting-Container">
      <TitleHeader>
        <Chat />
        <span>Обращения</span>
      </TitleHeader>
      <div className="user-wrapper"></div>
    </div>
  );
};

export default Chatting;
