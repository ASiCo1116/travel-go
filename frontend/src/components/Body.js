import React from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

import "@reach/combobox/styles.css";
import "antd/dist/antd.css";
import Search from "./Search";
// import useTravel from "../hook/useTravel";
import SelfMarker from "./SelfMarker";
import Sidebar from "./Sidebar";
import { Container, Row, Col } from "reactstrap";

import dotenv from "dotenv-defaults";

dotenv.config();

const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const center = {
  lat: 25.032969,
  lng: 121.565414,
};

const Body = ({
  travel,
  addToTravel,
  deleteOneSpot,
  reorderTravel,
  setTravel,
  planName,
  setPlanName,
  addTime,
  addTodo,
  addPlanName,
}) => {
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [response, setResponse] = React.useState("");
  const [suggestions, setSuggestions] = React.useState([]);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  /////////utility function//////////////////////////////////
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  const placeIDToDetail = React.useCallback((latlng, place_id, setCardSpot) => {
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

  const SearchNearby = React.useCallback((spotType) => {
    const service = new window.google.maps.places.PlacesService(mapRef.current);

    const request = {
      location: {
        lat: mapRef.current.center.lat(),
        lng: mapRef.current.center.lng(),
      },
      radius: 1000,
      type: [spotType],
    };
    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        //console.log(results)
        setSuggestions(results);
      }
    });
  }, []);

  const directionsCallback = (response) => {
    //console.log("this is response:", response);

    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
      } else {
        console.log("response:", response);
      }
    }
  };

  //console.log(planName)

  /////////utility function//////////////////////////////////

  // if (loadError) return "Error";
  // if (!isLoaded) return "Loading...";

  return (
    <div className="mt-24 flex h-screen overflow-y-hidden fixed w-screen">
      <div
        id="sidebar"
        className="w-1/4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-300 overflow-y-scroll"
      >
        <Sidebar
          travel={travel}
          addToTravel={addToTravel}
          deleteOneSpot={deleteOneSpot}
          reorderTravel={reorderTravel}
          setTravel={setTravel}
          planName={planName}
          setPlanName={setPlanName}
          panTo={panTo}
          placeIDToDetail={placeIDToDetail}
          mapRef={mapRef}
          SearchNearby={SearchNearby}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
          addTime={addTime}
          addTodo={addTodo}
          addPlanName={addPlanName}
        />
      </div>
      <div className="w-3/4">
        {/* <Search
          panTo={panTo}
          placeIDToDetail={placeIDToDetail}
          addToTravel={addToTravel}
          planName={planName}
        /> */}
        <GoogleMap
          id="map"
          mapContainerStyle={mapContainerStyle}
          zoom={14}
          center={center}
          onLoad={onMapLoad}
        >
          <SelfMarker
            travel={travel}
            Marker={Marker}
            DirectionsService={DirectionsService}
            DirectionsRenderer={DirectionsRenderer}
            response={response}
            directionsCallback={directionsCallback}
          />
        </GoogleMap>
      </div>
    </div>
  );
};

export default Body;
