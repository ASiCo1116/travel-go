import { Avatar, Button, Drawer, Input, Badge, DatePicker,message,Cascader  } from "antd";
import moment from "moment";
import { MinusOutlined, EditOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useState, useCallback, useRef } from "react";
import ReactDOM from "react-dom";
import Search from "./Search";
import axios from "axios";
import { CreateTravel, MutateTravel,QueryTravelDetail,QueryTravelName } from "../api/api.js";
import DraggableCard from "./DraggableCard"

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

const onOkTime = (value, dateString) => {
  console.log("onOk: ", value);
};

const savePlan = async (travel) => {
  //console.log("oooo")
  let x = document.getElementById("PlanNameInput");
  console.log(x.value);
  if (x.value === "") {
    message.warning("Please fill in the Plan Name Before Saving");
  } else {
    console.log(travel);
    let res=await MutateTravel(travel);
    console.log(res)
    message.success(res)

  }
};
/*
const options = [
  {
    value: 'sam',
    label: 'sam',

<<<<<<< HEAD
=======
  },
  {
    value: 'manyi',
    label: 'manyi',
  },
];
*/


>>>>>>> 9844886debcc36689caa4fd0c4f4e744344b8877
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
  setSuggestions,
  addTime,
  addTodo,
  addPlanName,
  NewTravel,
  setNewTravel,
  TravelFromDB, 
  setTravelFromDB
}) => {
  // const [items, setItems] = useState([]);
  const [options, setOptions] = useState([]);

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
    console.log(newItems);
  };


  const onChangePlanName=(e)=>{
    setPlanName(e.target.value)
    addPlanName(travel,e.target.value)
  };

  const [visible, setVisable] = useState(false);

  const showSearchLocation = () => {
    setVisable(true);
  };

  const onClose = () => {
    setVisable(false);
  };

  const onSelectTravel=async (value)=>{
    console.log(value)
    travel= await QueryTravelDetail(value)
    console.log(travel)
    setTravel(travel)

  }

  return (
    <div className="md:space-y-4 pt-4">
      <Button type="primary" onClick={ 
        ()=>{setNewTravel(false)
         setTravelFromDB(false)
         setTravel([]) 
         }}>
        return
      </Button>

    {

    NewTravel? 
  (<div>
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
      <p>plan name:</p>
      <Input
        className="w-48 block"
        id="PlanNameInput"
        placeholder="Plan name"
        //defaultValue="TestPlan"
        onChange={onChangePlanName}
      />
    </div>

    </div>
    )
    :TravelFromDB?(
      <div className="flex items-center justify-center justify-evenly">
      <Cascader options={options}  placeholder="Please select" onChange={onSelectTravel} />
      </div>
    )
    :( <div className="flex items-center justify-center justify-evenly">
    <Button type="primary" onClick={()=>{setNewTravel(true)}}>
      Add New Travel
    </Button>
    <Button
      // type="primary"
      onClick={async () => {
        setTravelFromDB(true)
        let options=await QueryTravelName()
        setOptions(options)
      
      }}
    >
      from DB
    </Button>
  </div>)

            
    }
    

      <div className="flex items-center justify-center">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="md:space-y-4"
              >
                {travel.length !== 0
                  ? travel.map((item, index) => (
                      <DraggableCard
                        item={item}
                        index={index}
                        onOkTime={onOkTime}
                        getItemStyle={getItemStyle}
                        numberToAlphabet={numberToAlphabet}
                        deleteOneSpot={deleteOneSpot}
                        travel={travel}
                        addTime={addTime}
                        setTravel={setTravel}
                        addTodo={addTodo}
                      />
                    ))
                  : null}
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
          planName={planName}
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
