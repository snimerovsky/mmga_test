import React, { useState, useEffect, useRef } from 'react';
import clipboard from 'clipboard-polyfill';
import './Crew.scss';
import { withApi } from '../../../../api/withApi';
import Label from '../components/Label';
import TitleHeader from '../components/TitleHeader';
import Collapse from '../components/Collapse';
import Avatar from '../components/Avatar';
import { Team, Megaphone, Group, Running } from '../../../../assets/icons';

import { Col, Row, Button, notification, Input } from 'antd';

const invites = [
  {
    rang: 1,
    invited: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 0, 1, 2, 3, 4],
  },
  { rang: 2, invited: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { rang: 3, invited: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { rang: 4, invited: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { rang: 5, invited: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  { rang: 6, invited: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
];

export const Crew = (props: any) => {
  const { user, authStore, api } = props;
  const crewStatInit = { all: 0, invited: 0, invited_active: 0 };
  const [crewStat, setCrewStat] = useState<any>(crewStatInit);
  const [referrer, setReferrer] = useState('');

  const [invited, setInvited] = useState<any>(invites);

  const ref = useRef<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const team = await api?.getTeam();
      setCrewStat({ ...crewStat, ...team.data });
      console.log('team.data', team.data);
      const newInvtedState = Object.entries(team.data)
        .map(([key, value]: any) => {
          console.log('key', key);
          if (key.indexOf('rang') > -1) {
            return { rang: key.replace('rang', ''), invited: value };
          } else return null;
        })
        .filter((e: any) => e !== null)
        .filter((e: any) => e.invited !== null);

      setInvited(newInvtedState);

      console.log('newInvtedState', newInvtedState);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setReferrer(`https://mmga.ru/registration/${user?.referrer}`);
  }, [referrer, user]);

  const copyToClipboard = (e: any) => {
    clipboard.writeText(referrer);
    notification.success({ message: 'Ссылка скопирована в буфер обмена' });
  };

  return (
    <div className="Crew-Container">
      <TitleHeader>
        <Team />
        <span>Команда</span>
      </TitleHeader>
      <div className="user-wrapper Crew-Container__RightGap">
        <div className="Crew-Container_Header">
          <div className="Crew-Container_Header_Item">
            <span className="Crew-Container_Header_Item_Header __BolderBoldFont">
              Ваша реф ссылка:
            </span>
            <div className="Crew-Container_Header_Item-Container">
              <div className="Crew-Container_Header_Item_Textarea" ref={ref}>
                {referrer}
              </div>
              <Button
                className="Crew-Container_Header_Item_Textarea_Button"
                onClick={copyToClipboard}
              >
                Скопировать
              </Button>
            </div>
          </div>
          <div className="Crew-Container_Header_Item">
            <span className="Crew-Container_Header_Item_Header __BolderBoldFont">
              Приглашение от:
            </span>
            <Avatar
              img={crewStat?.invited_by?.profile_picture}
              city={
                crewStat?.invited_by?.city
                  ? crewStat?.invited_by?.city
                  : 'Москва'
              }
              name={
                crewStat?.invited_by?.login
                  ? crewStat?.invited_by?.login
                  : 'Александр Гаврилов'
              }
            />
          </div>
        </div>
        <Label>Статистика команды</Label>

        <div className="Crew-Container_Stat-Section">
          <div className="Crew-Container_Stat-Section_Item">
            <Group />
            <span className="Crew-Container_Stat-Section_Item_Number __all __BoldFont">
              {crewStat.all}
            </span>
            <span className="Crew-Container_Stat-Section_Item_Description ">
              Всего людей в структуре
            </span>
          </div>
          <div className="Crew-Container_Stat-Section_Item">
            <Megaphone />
            <span className="Crew-Container_Stat-Section_Item_Number __invited __BoldFont">
              {crewStat.invited}
            </span>
            <span className="Crew-Container_Stat-Section_Item_Description">
              Человек приглашено
            </span>
          </div>
          <div className="Crew-Container_Stat-Section_Item">
            <Running />
            <span className="Crew-Container_Stat-Section_Item_Number __invitedActive __BoldFont">
              {crewStat.invited_active}
            </span>
            <span className="Crew-Container_Stat-Section_Item_Description">
              Активных участников
            </span>
          </div>
        </div>
        <Label>Вы пригласили</Label>

        <div className="Crew-Container_Invited-Container">
          <Collapse invited={invited} />
        </div>
      </div>
    </div>
  );
};

export default withApi(Crew);
