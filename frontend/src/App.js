import "./App.css";
import Header from "./components/Header";
import Body from "./components/Body";
import SignIn from "./components/SignIn";
import { useState, useEffect } from "react";
import useTravel from "./hook/useTravel";
import dotenv from "dotenv-defaults";
import { useLoadScript } from "@react-google-maps/api";
import { message } from "antd";

dotenv.config();
const libraries = ["places"];

const App = () => {
  const LOCALSTORAGE_KEY = "signIn";
  const savedUser = localStorage.getItem(LOCALSTORAGE_KEY);
  const [signedIn, setSignedIn] = useState(false);
  const [userName, setUserName] = useState(savedUser || "");

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload;
      const content = {
        content: msg,
        duration: 1,
      };
      switch (type) {
        case "success":
          message.success(content);
          break;
        case "error":
        default:
          message.error(content);
          break;
      }
    }
  };

  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, userName);
    }
  }, [signedIn]);

  const [planName, setPlanName] = useState("");
  const {
    travel,
    addToTravel,
    deleteOneSpot,
    reorderTravel,
    setTravel,
    addTime,
    addTodo,
    addPlanName,
  } = useTravel();

  const [NewTravel, setNewTravel] = useState(false);
  const [TravelFromDB, setTravelFromDB] = useState(false);

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div>
      <Header signedIn={signedIn} userName={userName} />
      {signedIn ? (
        <Body
          travel={travel}
          addToTravel={addToTravel}
          deleteOneSpot={deleteOneSpot}
          reorderTravel={reorderTravel}
          setTravel={setTravel}
          planName={planName}
          setPlanName={setPlanName}
          addTime={addTime}
          addTodo={addTodo}
          addPlanName={addPlanName}
          NewTravel={NewTravel}
          setNewTravel={setNewTravel}
          TravelFromDB={TravelFromDB}
          setTravelFromDB={setTravelFromDB}
          userName={userName}
        />
      ) : (
        <SignIn
          userName={userName}
          setUserName={setUserName}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      )}
    </div>
  );
};

export default App;
