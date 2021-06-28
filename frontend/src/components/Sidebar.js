import { Avatar, Button, Drawer, Input, Badge, DatePicker } from "antd";
import moment from "moment";
import { MinusOutlined, EditOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import Search from "./Search";
import axios from "axios";
import { CreateTravel, MutateTravel } from "../api/api.js";

const { RangePicker } = DatePicker;

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: "white",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  // width: 250,
});

const numberToAlphabet = (number) => {
  let alphabet = "";
  let mod;

  mod = number % 26;
  alphabet = String.fromCharCode(65 + mod) + alphabet;
  number = ((number - mod) / 26) | 0;

  return alphabet || undefined;
};

const onChangeTime = (value, dateString) => {
  console.log("Selected Time: ", value);
  console.log("Formatted Selected Time: ", dateString);
};

const onOkTime = (value) => {
  console.log("onOk: ", value);
};

const savePlan = (travel) => {
  console.log(travel);
  MutateTravel(travel);
};

const Sidebar = ({
  travel,
  addToTravel,
  deleteOneSpot,
  reorderTravel,
  setTravel,
  planName,
  setPlanName,
  panTo,
  placeIDToDetail,
}) => {
  // const [items, setItems] = useState([]);

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorderTravel(
      travel,
      result.source.index,
      result.destination.index
    );

    setTravel(newItems);
    // console.log(newItems);
  };

  const [visible, setVisable] = useState(false);

  const showSearchLocation = () => {
    setVisable(true);
  };

  const onClose = () => {
    setVisable(false);
  };

  return (
    <div className="md:space-y-4 pt-4">
      <div className="flex items-center justify-center justify-evenly">
        <Button type="primary" onClick={showSearchLocation}>
          Add place
        </Button>
        <Button
          // type="primary"
          onClick={() => {
            savePlan(travel);
          }}
        >
          Save plan
        </Button>
      </div>

      <div className="items-center">
        <Input
          className="w-48 block"
          placeholder="Plan name"
          onChange={(e) => {
            setPlanName(e.target.value);
          }}
        />
      </div>

      <div className="flex items-center justify-center">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="md:space-y-4"
              >
                {travel.map((item, index) => (
                  <Draggable
                    key={item.placeId}
                    draggableId={item.placeId}
                    index={index}
                  >
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
                        <button
                          className="self-start"
                          onClick={() => deleteOneSpot}
                        >
                          {<MinusOutlined />}
                        </button>
                        <div className="flex w-80">
                          <Badge count={numberToAlphabet(index)}>
                            <Avatar
                              shape="circle"
                              size={100}
                              src={item.photoURL}
                            />
                          </Badge>
                          <div id="card-body" className="ml-2">
                            <div
                              id="title"
                              className=" text-center font-bold text-lg "
                            >
                              {item.name}
                            </div>

                            <div id="content">
                              <div id="content__time">
                                Arrive time
                                <DatePicker
                                  bordered={false}
                                  showTime={{ format: "HH:mm" }}
                                  format="YYYY-MM-DD HH:mm"
                                  onChange={onChangeTime}
                                  onOk={onOkTime}
                                />
                                Leave time
                                <DatePicker
                                  bordered={false}
                                  showTime={{ format: "HH:mm" }}
                                  format="YYYY-MM-DD HH:mm"
                                  onChange={onChangeTime}
                                  onOk={onOkTime}
                                />
                              </div>
                              <div id="content__todo">
                                Todo
                                <div>
                                  <input type="text" />
                                </div>
                              </div>
                              {/* <div>{<EditOutlined />}</div> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <Drawer
        title="Search location"
        placement="bottom"
        closable={false}
        onClose={onClose}
        visible={visible}
        getContainer={false}
        style={{ position: "absolute" }}
        height="50%"
      >
        <Search
          panTo={panTo}
          placeIDToDetail={placeIDToDetail}
          addToTravel={addToTravel}
        />
      </Drawer>
      <div className="flex items-center justify-center">{planName}</div>
    </div>
  );
};

// ReactDOM.render(<Sidebar />, document.getElementById("testnode"));
export default Sidebar;
