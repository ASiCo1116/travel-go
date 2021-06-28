import "./App.css";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import { useState } from "react";
import useTravel from "./hook/useTravel";
import dotenv from "dotenv-defaults";
import { useLoadScript } from "@react-google-maps/api";

dotenv.config();

const App = () => {
  const [signIn, setSignIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [planName, setPlanName] = useState("");
  const { travel, addToTravel, deleteOneSpot, reorderTravel, setTravel } =
    useTravel();

  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const libraries = ["places"];

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries,
  });

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="h-full overflow-hidden fixed">
      <Header />
      <Map
        travel={travel}
        addToTravel={addToTravel}
        deleteOneSpot={deleteOneSpot}
        reorderTravel={reorderTravel}
        setTravel={setTravel}
        planName={planName}
        setPlanName={setPlanName}
      />
    </div>
  );
};

export default App;
