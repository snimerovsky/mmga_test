import React, { useEffect, useState } from "react";
import { withApi } from "../../../../api/withApi";
import { Badge as BadgeAntd } from "antd";

function Badge({ api }) {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(true);

  const getCounts = async () => {
    const taskList = (await api.getTasks()).data;
    setCount(taskList.tasks.length);
  };

  useEffect(() => {
    // getCounts();
  }, []);
  return (
    <BadgeAntd
      count={count}
      style={{
        backgroundColor: isActive ? "#abd029" : "#ff0000",
        boxShadow: "none",
        fontWeight: "bold",
        fontFamily: "ProbaPro-ExtraLight",
      }}
    />
  );
}

export default withApi(Badge);
