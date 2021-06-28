import { Card, Avatar, Button, Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useState } from "react";
import useCardSpot from "../hook/useCardSpot";

const { Meta } = Card;

const InnerCard = ({
  spotName,
  spotAddress,
  photoUrl,
  cardSpot,
  addToTravel,
  setCardSpot,
  planName,
  setSuggestions,
  suggestions
}) => {
  const onClickAddTravel = () => {
    console.log("hi");
    console.log(cardSpot);
    console.log(planName);

    addToTravel(cardSpot, planName);
    if (cardSpot) setCardSpot(null);
    if(suggestions)setSuggestions([]);
    
    
  };
  //console.log(planName);

  return (
    <div className="site-card-wrapper">
      <Row gutter={16}>
        <Col span={6}>
          <Card
            title={spotName}
            bordered={true}
            extra={
              <button className="addtravel" onClick={onClickAddTravel}>
                <PlusOutlined />
                {/* <img src="/close.svg.png" width="15" height="15" alt="add" /> */}
              </button>
            }
          >
            <Meta
              className=" text-red-500"
              avatar={<Avatar shape="square" size={100} src={cardSpot.photos[0].getUrl()} />}
              description={spotAddress}
            />
          </Card>
        </Col>
        {/* <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Card title" bordered={false}>
          Card content
        </Card>
      </Col> */}
      </Row>
    </div>
  );
};

export default InnerCard;
