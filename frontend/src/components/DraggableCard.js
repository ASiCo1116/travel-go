import { Card, Avatar, Badge, DatePicker } from "antd";
import "antd/dist/antd.css";
import React, { useEffect,useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { MinusOutlined, EditOutlined } from "@ant-design/icons";
import CustomDatePicker from "./CustomDatePicker"


const { Meta } = Card;

const DraggableCard = ({
  item,
  index,
  travel,
  onOkTime,
  getItemStyle,
  deleteOneSpot,
  numberToAlphabet,
  addTime,
  setTravel,
  addTodo,
}) => {
  const onChangeArriveTime = (value, dateString) => {
    //console.log("Selected Time: ", value);
    console.log("index", index);
    console.log("Arrive Time: ", value);
    const newitems = addTime(travel, index, value, true);
    //console.log(newitems)
    setTravel(newitems);
  };

  const onChangeDepartureTime = (value, dateString) => {
    //console.log("Selected Time: ", value);
    console.log("index", index);
    console.log("Departure Time: ", value);
    const newitems = addTime(travel, index, value, false);
    //console.log(newitems)
    setTravel(newitems);
  };
  const onChangeTodo = (e) => {
    //console.log(e.target.value);
    const newitems = addTodo(travel, index, e.target.value);
    setTravel(newitems);
  };



const onChangeArriveTime = (value, dateString) => {
  //console.log("Selected Time: ", value);
  //console.log("index",index)
  console.log("Arrive Time: ", value);
  console.log("Arrive Time dateString:", dateString);
  const newitems=addTime(travel,index,value,true)
  //console.log(newitems)
  setTravel(newitems);
  
  
};
/*
const onChangeDepartureTime = (value, dateString) => {
  //console.log("Selected Time: ", value);
  console.log("index",index)
  console.log("Departure Time: ", value);
  const newitems=addTime(travel,index,value,false)
  //console.log(newitems)
  setTravel(newitems);

  
  
};
*/
const onChangeDepartureTime = (event) => {
  
  console.log(event)
  console.log( JSON.stringify(event))
  
  
};
const onChangeTodo = (e) => {
  //console.log(e.target.value);
  const newitems=addTodo(travel,index,e.target.value)
  setTravel(newitems);
};

const onClickDeleteSpot = () => {
  const newitems=deleteOneSpot(travel,index);
  setTravel(newitems);
};


  return (
    <Draggable key={item.placeId} draggableId={item.placeId} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
          className="rounded-md border-gray-400 border"
        >
          <button className="self-start" onClick={onClickDeleteSpot}>
            {<MinusOutlined />}
          </button>
          <div className="flex w-80">
            <Badge count={numberToAlphabet(index)}>
              <Avatar shape="circle" size={100} src={item.photoURL} />
            </Badge>
            <div id="card-body" className="ml-2">
              <div id="title" className=" text-center font-bold text-lg ">
                {item.name}
              </div>

                            <div id="content">
                              <div id="content__time">
                                Arrive time
                                < CustomDatePicker
                                  bordered={false}
                                  showTime={{ format: "HH:mm" }}
                                  format="YYYY-MM-DD HH:mm"
                                  onChange={onChangeArriveTime }
                                  onOk={onOkTime}
                                  //value={item.arriveTime}
                                  value="2021-06-03 04:34"
                                
                                />
                                Leave time
                                <DatePicker
                                  bordered={false}
                                  showTime={{ format: "HH:mm" }}
                                  format="YYYY-MM-DD HH:mm"
                                  onChange={onChangeDepartureTime}
                                  onOk={onOkTime}
                                  value={item.departureTime}
                                />
                              </div>
                              <div id="content__todo">
                                Todo
                                <div>
                                  <input type="text" onChange={ onChangeTodo } value={item.todo}  />
                                </div>
                              </div>
                              {/* <div>{<EditOutlined />}</div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
  );
};

export default DraggableCard;
