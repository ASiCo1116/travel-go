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
  suggestions,
}) => {
  const onClickAddTravel = () => {
    console.log("hi");
    console.log(cardSpot);
    console.log(planName);

    addToTravel(cardSpot,planName);
    if (cardSpot) setCardSpot(null);
    if (suggestions) setSuggestions([]);
  };
  //console.log("planName",planName);

  return (
    <div className="w-80">
      <Card
        className="w-80"
        title={spotName}
        bordered={true}
        extra={
          <button className="addtravel" onClick={onClickAddTravel}>
            <PlusOutlined />
          </button>
        }
      >
        <Meta
          className=" text-red-500"
          avatar={<Avatar shape="square" size={100} src={photoUrl} />}
          description={spotAddress}
        />
      </Card>
    </div>
  );
};

export default InnerCard;
