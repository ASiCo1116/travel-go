import { List, Avatar, Button, Drawer, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import Search from "./Search";
import axios from "axios";
import { CreateTravel, MutateTravel } from "../api/api.js";

// import useTravel from "../hook/useTravel";

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
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  // width: 250,
});

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
  SearchNearby,
  suggestions,
  setSuggestions
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
    <div className="w-96">
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

      <div className="flex items-center justify-center justify-evenly">
        <Input
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
              <div {...provided.droppableProps} ref={provided.innerRef}>
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
                      >
                        {
                          <Avatar
                            shape="square"
                            size={100}
                            src={item.photoURL}
                          />
                        }
                        {"\n"}
                        {item.name}
                        {"\n"}
                        {item.formatted_address}
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
        height={512}
      >
        <Search
          panTo={panTo}
          placeIDToDetail={placeIDToDetail}
          addToTravel={addToTravel}
          SearchNearby={SearchNearby}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
      </Drawer>
      <div className="flex items-center justify-center">{planName}</div>
    </div>
  );
};

// ReactDOM.render(<Sidebar />, document.getElementById("testnode"));
export default Sidebar;
