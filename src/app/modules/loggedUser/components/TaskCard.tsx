import React from 'react';
import './TaskCard.scss';
import classnames from 'classnames';

import { Heart, Alarm, Plus, Checked } from '../../../../assets/icons';

export const TaskCard = ({
  checkAction,
  type,
  checked,
  id,
  task,
  topLeft,
}: any) => {
  const url = task.url;
  const image = task.image;
  return (
    <a target="blank" rel="noopener noreferrer" href={url}>
      <div onClick={() => checkAction(id)} className="TaskCard-Container">
        <div className="TaskCard-Container-Img">
          <img
            src={
              image
                ? image
                : 'https://assets.jpegmini.com/user/images/slider_puffin_jpegmini_mobile.jpg'
            }
            alt="instagramm"
          />
        </div>
        {type === 'sub' ? null : (
          <div className="TaskCard-Container_Icon Status">
            <Alarm />
          </div>
        )}
        <div
          className={`TaskCard-Container_Icon Action ${classnames({
            checked: checked,
          })}`}
        >
          {type === 'sub' ? !checked ? <Plus /> : <Checked /> : <Heart />}
        </div>
      </div>
    </a>
  );
};

export default TaskCard;
