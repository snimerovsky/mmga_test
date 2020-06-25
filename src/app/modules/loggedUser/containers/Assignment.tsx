import React, { useState, useEffect } from "react";
import "./Assignment.scss";
import TitleHeader from "../components/TitleHeader";
import { Key } from "../../../../assets/icons";
import ProgresBar from "../components/ProgresBar";
import Label from "../components/Label";
import TaskCard from "../components/TaskCard";
import { Col, Row, Button, notification, message } from "antd";
import { withApi } from "../../../../api/withApi";
import { withRoute } from "react-router5";
import { RouteNameChoices, RouteNames, router } from "../../router";
import lockImg from "../../../../styles/sources/images/icons/lock.svg";

import { inject, observer } from "mobx-react";
import { Api } from "../../../../api";
import { AuthStore } from "../../authorization/stores/AuthStore";

interface IProps {
  api: Api;
  user?: any;
  authStore: AuthStore;
  route: any;
}

export const Assignment = (props: IProps) => {
  const {
    user,
    api,
    authStore,
    route: { path },
  } = props;

  const [completedTasks, setCompletedTasks] = useState(0);
  const [loading, setLoading] = useState(false);

  const [pictures, setPictures] = useState([{ checked: false }]);
  const [completed, setCompleted] = useState(false);
  const [currentIdTask, setCurrentIdTask] = useState(0);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const tasks = await api.getTasks();
      const newTasks = tasks.data.tasks.map((task: any) => {
        task.checked = false;
        return task;
      });
      setPictures(newTasks);
      setCurrentIdTask(tasks.data.id);
    };
    fetchData();
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("user", user);
  }, [user]);
  useEffect(() => {
    if (
      pictures.every((task: any) => {
        return task.checked === true;
      })
    )
      setCompleted(true);
  }, [pictures]);

  const onSubmit = async () => {
    if (!completed) {
      notification.error({ message: "Выполните все задания", duration: 5 });
      return;
    }
    try {
      await api.completeTasks(currentIdTask, {
        tasks: pictures,
      });
      authStore.fetchMyProfile();
      router.navigate(RouteNames[RouteNameChoices.tasks]);
    } catch (e) {}
  };

  const completeTask = (id: any) => {
    if (!pictures[id]!.checked) setCompletedTasks(completedTasks + 1);
    const newPictures = pictures;
    newPictures[id]!.checked = true;
    setPictures([...newPictures]);
  };

  return (
    <div className="Tasks-Container">
      <div className="lockBox">
        <div className="imgBox">
          <img src={lockImg} alt={"lock"} className="imgLock" />
        </div>
      </div>
      <TitleHeader>
        <Key />
        <span>
          Для начала работы с сервисом, выполните обязательное задание
        </span>
      </TitleHeader>
      <div className="user-wrapper">
        <Label>Подпишитесь на 12 аккаунтов</Label>

        {!loading && (
          <>
            <div className="Tasks-Container_Container_ProgresBar">
              <ProgresBar
                labeLeft="Выполнено"
                activeColor={"#abd029"}
                total={pictures.length}
                done={completedTasks}
              />
            </div>
            <Row
              gutter={[30, 30]}
              className="Tasks-Container_Container_Pictures"
            >
              {pictures.map((pic: any, index: any) => (
                <Col className="Tasks-Container_Container_Pictures_Item" md={6}>
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
            <Button
              className="Tasks-Container_Container_Pictures_Button"
              type="primary"
              onClick={onSubmit}
            >
              Проверить задания
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

// export default withRoute(withApi(observer(Assignment)));

export default Assignment;
