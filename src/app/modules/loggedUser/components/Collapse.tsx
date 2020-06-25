import React, { useState } from "react";
import "./Collapse.scss";
import { Collapse, Button } from "antd";
import { Man } from "../../../../assets/icons";

const { Panel } = Collapse;

const CollapseComp = (props: any) => {
  const { invited } = props;
  const [active, setActive] = useState(["999"]);

  const expandButton = (active: boolean) => (
    <div className="expandButton">
      {active ? (
        <Button type="primary">Спрятать</Button>
      ) : (
        <Button className="expandButton__inactive">Весь список</Button>
      )}
    </div>
  );

  const expandIcon = () => <div></div>;
  return (
    <Collapse
      className="Collapse-Container"
      expandIcon={expandIcon}
      defaultActiveKey={active}
      onChange={(e: any) => setActive(e)}
    >
      {invited.map((inv: any, index: any) => {
        const rowLength = 5;
        return (
          <Panel
            className="Collapse-Container_Pannel"
            header={
              <div className="Collapse-Container_Pannel_Header">
                <div className="Collapse-Container_Pannel_Header_Title __BolderBoldFont">
                  {inv.rang} уровень
                </div>
                <div className="Collapse-Container_Pannel_Icon-Container">
                  {inv.invited.slice(0, rowLength).map((user: any) => (
                    <a
                      href={`https://instagram.com/${user.username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="Collapse-Container_Pannel_Header_Icon avatar"
                    >
                      {user.profile_picture ? (
                        <>
                          <img
                            src={user.profile_picture}
                            style={{
                              maxWidth: "50px",
                              borderRadius: "50%",
                              border: "1px solid #7d9dff",
                            }}
                            className="avatar"
                          />
                        </>
                      ) : (
                        <Man />
                      )}
                    </a>
                  ))}
                </div>
                <div className="Collapse-Container_Pannel_Button-Container">
                  {expandButton(active.indexOf(`${index}`) > -1)}
                </div>
              </div>
            }
            key={index}
          >
            <div className="Collapse-Container_Pannel_Content">
              <div style={{ width: "155px" }}></div>
              <div className="Collapse-Container_Pannel_Icon-Container">
                {inv.invited
                  .slice(rowLength, inv.invited.length)
                  .map((user: any) => (
                    <div className="Collapse-Container_Pannel_Header_Icon">
                      <Man />
                    </div>
                  ))}
              </div>
              <div className="Collapse-Container_Pannel_Button-Container"></div>
            </div>
          </Panel>
        );
      })}
    </Collapse>
  );
};

export default CollapseComp;
