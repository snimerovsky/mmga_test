import React, { useEffect, useState } from 'react';
import './Tasks.scss';
import TaskCard from '../components/TaskCard';
import ProgresBar from '../components/ProgresBar';
import TitleHeader from '../components/TitleHeader';
import Label from '../components/Label';
import { Col, Row, Button, notification, Popover } from 'antd';
import { withApi } from '../../../../api/withApi';
import { withRoute } from 'react-router5';

import { Mark, Question } from '../../../../assets/icons';
import { inject, observer } from 'mobx-react';
import {Api} from "../../../../api";
import {AuthStore} from "../../authorization/stores/AuthStore";

const warningPopover = () => {
  const content = (
    <div className="WarningPopover-Container">
      <p>При 5 предупреждениях, ваш аккаунт автоматически блокируется!</p>
    </div>
  );
  return (
    <Popover content={content}>
      <Question />
    </Popover>
  );
};

interface IProps {
  api: Api;
  authStore: AuthStore;
  route: any;
}

export const Tasks = (props: any) => {
  const {
    api,
    authStore,
    route: { path },
  } = props;

  const [completedTasks, setCompletedTasks] = useState(0);
  // const [loading, setLoading] = useState(false);

  const [taskList, setTaskList] = useState<{id: number, tasks: any[]}>({id: 0, tasks: []});
  // const [completed, setCompleted] = useState(false);

  const warnings = props?.user?.warnings;


  const fetchData = async () => {
    console.log("asking taskList == ");
    const taskList = (await api.getTasks()).data;
    console.log("received taskList == ", taskList);
    (taskList.tasks || []).forEach((e: { checked: boolean; }) => {
      e.checked = false;
    });
    setTaskList(taskList);
  };

  useEffect(() => {
    try {
      fetchData();
    } finally {
      setTaskList({id: 0, tasks: []});
      setCompletedTasks(0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   console.log("set completed called");
  //   console.log(taskList.tasks);
  //   if (taskList.tasks.length > 0 &&
  //       taskList.tasks.every((task: {checked?: boolean}) => {
  //         console.log("completed == ", task.checked);
  //       return task.checked === true;
  //     })
  //   ) {
  //     console.log("set completed called with true" );
  //     setCompleted(true);
  //   }
  // }, [taskList]);

  const onSubmit = async () => {
    const completed = taskList.tasks.every((task: {checked?: boolean}) => task.checked === true);
    if (!completed) {
      notification.error({ message: 'Выполните все задания', duration: 5 });
      return;
    }
    try {
      await api.completeTasks(taskList.id, {});

    } catch (e) {
      notification.error({ message: e.message, duration: 5 });
    } finally {
      setCompletedTasks(0);
    }
    try {
      await fetchData();
    } catch (e) {
      setTaskList({id: 0, tasks: []});
      setCompletedTasks(0);
    }
  };

  const completeTask = (id: any) => {
    console.log("fn completeTask called with id ", id);
    if (!taskList.tasks[id]!.checked) {
        setCompletedTasks(completedTasks + 1);
    }
    taskList.tasks[id]!.checked = true;
    setTaskList(taskList);
  };

  return (
    <div className="Tasks-Container">
      <TitleHeader>
        <Mark />
        <span>Ваши активные задания</span>
      </TitleHeader>

      {taskList?.tasks?.length === 0 ? (
        <div className="Tasks-Container_No-Tasks __BoldFont">
          Больше не осталось заданий
        </div>
      ) : (
        <div className="Tasks-Container_Container">
          <Label>Поставить лайки</Label>
          <div className="Tasks-Container_Container_ProgresBar">
            <ProgresBar
              labeLeft="Выполнено"
              activeColor={'#abd029'}
              total={taskList.tasks.length}
              done={completedTasks}
            />
          </div>

          <Row gutter={[30, 30]} className="Tasks-Container_Container_Pictures">
            {taskList.tasks.map((pic: any, index: number) => (
              <Col className="Tasks-Container_Container_Pictures_Item" md={6} key={index}>
                <TaskCard
                  checkAction={completeTask}
                  id={index}
                  checked={pic.checked}
                  type="sub"
                  task={pic}
                />
              </Col>
            ))}
          </Row>
          {warnings > 0 && (
            <div className="Tasks-Container_Container_Progress-Warning">
              <ProgresBar
                labeLeft="Предупреждения"
                activeColor={'#ee2e24'}
                total={5}
                done={warnings}
                labelTopLeft={warningPopover()}
              />
            </div>
          )}
          <Button
            className="Tasks-Container_Container_Pictures_Button"
            type="primary"
            onClick={onSubmit}
          >
            Проверить задания
          </Button>
        </div>
      )}
    </div>
  );
};

export default inject(({ authStore }: any) => ({ authStore }))(
  withRoute(withApi(observer(Tasks)))
);
