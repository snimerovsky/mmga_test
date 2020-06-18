import React from 'react';
import './News.scss';

import TitleHeader from '../components/TitleHeader';
import { Button } from 'antd';

import { News } from '../../../../assets/icons';

const NewsBlock = () => (
  <div className="NewsBlock_Item">
    <div className="NewsBlock_Item_Container">
      <div className="NewsBlock_Item_Container_Img"></div>
      <div className="NewsBlock_Item_Container_Text">
        <span className="NewsBlock_Item_Container_Text_Date"> 27/05/19</span>
        <span className="NewsBlock_Item_Container_Text_Title __BoldFont">
          Информация для новичков
        </span>
      </div>
    </div>
    <div className="NewsBlock_Item_Container_Button-Container">
      <Button type="primary">Подробнее</Button>
    </div>
  </div>
);

const news = [{}, {}, {}, {}, {}];

export const NewsComp = (props: any) => {
  return (
    <div className="News-Container">
      <TitleHeader>
        <News />
        <span>Новости</span>
      </TitleHeader>
      <div className="user-wrapper">
        <div className="News-Container_Container">
          {news.map((item) => (
            <NewsBlock />
          ))}
          <div className="News-Container_Container_Pagination">
            <span>1</span>
            <span>2</span>
            <span className="News-Container_Container_Pagination-Active">
              3
            </span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsComp;
