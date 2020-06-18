import React from 'react';
import './Analytics.scss';
import TitleHeader from '../components/TitleHeader';
import Label from '../components/Label';

import {
  Analytic,
  Heart,
  Group,
  Comment,
  Analytic2,
  Megaphone,
} from '../../../../assets/icons';

const AnalyticItem = ({ icon, title, description }: any) => (
  <div className="AnalyticItem">
    {icon} <span className="AnalyticItem_title __BoldFont">{title}</span>{' '}
    <span className="AnalyticItem_description">{description}</span>
  </div>
);

const analyticList = [
  { icon: <Megaphone />, title: '1500', description: 'Публикаций' },
  { icon: <Group />, title: '1.2 млн', description: 'Публикаций' },
  { icon: <Analytic2 />, title: '0.81%', description: 'Вовлеченность' },
  { icon: <Heart />, title: '7 777', description: 'Cредн. число лайков' },
  { icon: <Comment />, title: '35', description: 'Cредн. число коммент' },
];

export const Analytics = (props: any) => {
  return (
    <div className="Analytics-Container">
      <TitleHeader>
        <Analytic />
        <span>Аналитика</span>
      </TitleHeader>
      <div className="user-wrapper">
        <Label>Результат</Label>
        <div className="Analytics-Container_Icons">
          {analyticList.map((item, index) => (
            <>
              <AnalyticItem
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
              {index !== analyticList.length - 1 ? (
                <div className="Analytics-Container_Icons_Border"></div>
              ) : null}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
