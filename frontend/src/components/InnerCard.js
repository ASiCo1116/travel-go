import { Card, Avatar, Button } from "antd";
import "antd/dist/antd.css";
import React, { useEffect } from "react";
import { useState } from "react";
import useCardSpot from "../hook/useCardSpot";

const { Meta } = Card;

function InnerCard({
  spotName,
  spotAddress,
  photoUrl,
  cardSpot,
  addToTravel,
  setCardSpot,
  planName
}) {
  const onClickAddTravel = () => {
    console.log("hi");
    console.log(cardSpot);
    console.log(planName);

    addToTravel(cardSpot,planName);
    setCardSpot(null);
  };
  console.log(planName)

  return (
    <Card
      // hoverable
      // style={{ marginTop: 16 }}
      type="inner"
      title=""
      extra={
        <button className="addtravel" onClick={onClickAddTravel}>
          <img src="/close.svg.png" width="400" height="400" alt="add" />
        </button>
      }
      //loading={true}
      //cover={ <img alt="example" src={SelectedSpot.photos[0].getUrl() }/> }
    >
      <Meta
        avatar={<Avatar shape="square" size={100} src={photoUrl} />}
        title={spotName}
        description={spotAddress}
      />
    </Card>
  );
}

export default InnerCard;
