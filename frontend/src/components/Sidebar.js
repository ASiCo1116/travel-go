import { List, Avatar, Button, Drawer, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import Search from "./Search";
import axios from "axios";
import {CreateTravel,MutateTravel} from "../api/api.js"

// import useTravel from "../hook/useTravel";

// fake data generator
const getItems = (count) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

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

/*
 ***********  axios TODO  *********
 */
const savePlan = (travel) => {


  console.log(travel)
  MutateTravel(travel);
  
};





const Sidebar = ({
  travel,
  addToTravel,
  deleteOneSpot,
  reorderTravel,
  setTravel,
  planName,
  setPlanName
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
    console.log(travel);
    setVisable(true);
  };

  const onClose = () => {
    setVisable(false);
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////
  const mapRef = useRef();

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  // const { travel, addToTravel, deleteOneSpot } = useTravel();
  const placeIDToDetail = useCallback((latlng, place_id, setCardSpot) => {
    const service = new window.google.maps.places.PlacesService(mapRef.current);
    const request = {
      placeId: place_id,
      ffields: [
        "name",
        "rating", // 評價
        "formatted_address", // 地址
        "formatted_phone_number", // 電話
        "geometry", // 地理資訊
        "opening_hours", // 營業時間資訊
      ],
    };

    service.getDetails(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        let newresults = Object.assign(latlng, results);
        console.log(newresults);
        setCardSpot(newresults);
      }
    });
  }, []);

  /////////////////////////////////////////////////////////////////////////////////////////

  return (
    <div className="w-96">

      <div className="flex items-center justify-center justify-evenly">
        <Button type="primary" onClick={showSearchLocation}>
          Add place
        </Button>
        <Button onClick={()=>{savePlan(travel)}}>Save plan</Button>
      </div>

      <div className="flex items-center justify-center justify-evenly">
        <Input placeholder="Plan name" onChange={(e)=>{setPlanName(e.target.value)}} />
      </div>

      <div className="flex items-center justify-center">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {travel.map((item, index) => (
                  <Draggable
                    key={item.place_id}
                    draggableId={item.place_id}
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
      >
        <Search
          panTo={panTo}
          placeIDToDetail={placeIDToDetail}
          addToTravel={addToTravel}
        />
      </Drawer>
        <div>{planName}</div>

    </div>
  );
};

// ReactDOM.render(<Sidebar />, document.getElementById("testnode"));
export default Sidebar;
