import { Button, Drawer, Input, message, Cascader } from "antd";
import {
  EditOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  HistoryOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import Search from "./Search";
import {
  CreateTravel,
  MutateTravel,
  QueryTravelDetail,
  QueryTravelName,
} from "../api/api.js";
import DraggableCard from "./DraggableCard";

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

const savePlanMutate = async (travel,userName) => {
  //console.log("oooo")
    console.log(travel);
    const {res,status} = await MutateTravel(travel,userName);
    if (status){
      message.success(res);
    }
    else{
      message.error(res);
    }
  
};

const savePlanCreate = async (travel,userName) => {
  //console.log("oooo")
  let x = document.getElementById("PlanNameInput");
  console.log(x.value);
  if (x.value === "") {
    message.warning("Please fill in the Plan Name Before Saving");
  } else {
    console.log(travel);
    //let res = await CreateTravel(travel,userName);
    const {res,status} = await CreateTravel(travel,userName);
    console.log(res);
    console.log(status);
    if (status){
      message.success(res);
    }
    else{
      message.error(res);
    }
    
  }
};
/*
const options = [
  {
    value: 'sam',
    label: 'sam',

  },
  {
    value: 'manyi',
    label: 'manyi',
  },
];
*/

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
  setTravelFromDB,
  userName
}) => {
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

  const onChangePlanName = (e) => {
    setPlanName(e.target.value);
    addPlanName(travel, e.target.value);
  };

  const [visible, setVisable] = useState(false);

  const showSearchLocation = () => {
    setVisable(true);
  };

  const onClose = () => {
    setVisable(false);
  };

  const onSelectTravel = async (value) => { //選了travelname之後  把這個travelname set
   
    console.log(value);
    travel = await QueryTravelDetail(value);

    console.log(travel);
    setTravel(travel);
    document.getElementById("DBbutton").style.display = "block";
    setPlanName(value);
    addPlanName(travel,value)
  };

  return (
    <div id="sidebar" className="md:space-y-4 pt-4">
      <div className="flex items-center justify-center justify-evenly">
        <Button
          type="primary"
          icon={<HomeOutlined />}
          onClick={() => {
            setNewTravel(false);
            setTravelFromDB(false);
            setTravel([]);
          }}
        >
          Main menu
        </Button>
      </div>
      {NewTravel ? (
        <div>
          <div className="flex items-center justify-center justify-evenly">
            <Button icon={<EnvironmentOutlined />} onClick={showSearchLocation}>
              Add place
            </Button>
            <Button
              icon={<SaveOutlined />}
              onClick={() => {
                savePlanCreate(travel,userName);
              }}
            >
              Save plan
            </Button>
          </div>

          <div className="mt-4">
            <input
              type="text"
              className="block text-center r-1/2 w-full text-xl"
              id="PlanNameInput"
              placeholder="Fill in your plan name"
              //defaultValue="TestPlan"
              onChange={onChangePlanName}
            />
          </div>
        </div>
      ) : TravelFromDB ? (
        <div>
            <div className="flex items-center justify-center justify-evenly">
              <div>
              <Cascader
                options={options}
                placeholder="Please select"
                onChange={onSelectTravel}
                allowClear={false}
              />
              </div>
            </div>

            <div className="flex items-center justify-center justify-evenly" id="DBbutton" style={{display: 'none'  }} >
            <Button icon={<EnvironmentOutlined />} onClick={showSearchLocation}>
              Add place
            </Button>
            <Button
              icon={<SaveOutlined />}
              onClick={() => {
                savePlanMutate(travel,userName);
              }}
            >
              Save plan
            </Button>
            </div>
        </div>
      ) : (
        <div className="flex items-center justify-center justify-evenly">
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setNewTravel(true);
            }}
          >
            Start a new plan
          </Button>
          <Button
            icon={<HistoryOutlined />}
            onClick={async () => {
              setTravelFromDB(true);
              let options = await QueryTravelName(userName);
              setOptions(options);
            }}
          >
            Previous plans
          </Button>
        </div>
      )}

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
    </div>
  );
};

// ReactDOM.render(<Sidebar />, document.getElementById("testnode"));
export default Sidebar;
