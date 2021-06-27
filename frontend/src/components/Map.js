import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
// import usePlacesAutocomplete, {
//   getGeocode,
//   getLatLng,
// } from "use-places-autocomplete";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
// import mapStyles from "./mapStyles";
// import { Card } from "antd";
import "antd/dist/antd.css";
import Search from "./Search";
// import useTravel from "../hook/useTravel";
import SelfMarker from "./SelfMarker";

import dotenv from "dotenv-defaults";

dotenv.config();

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  //styles: mapStyles,
  //disableDefaultUI: true,
  //zoomControl: true,
};
const center = {
  lat: 25.032969,
  lng: 121.565414,
};

const Map = ({ travel, addToTravel, deleteOneSpot }) => {
  // const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: googleMapsApiKey,
  //   libraries,
  // });

  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  // const { travel, addToTravel, deleteOneSpot } = useTravel();
  const [response, setResponse] = React.useState("");

  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

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

  const directionsCallback = (response) => {
    console.log("this is response:", response);

    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
      } else {
        console.log("response:", response);
      }
    }
  };

  /////////utility function//////////////////////////////////

  // if (loadError) return "Error";
  // if (!isLoaded) return "Loading...";

  return (
    <div>
      {/* <h1>
        Travel GO{" "}
        <span role="img" aria-label="tent">
          ⛺️
        </span>
      </h1> */}

      {/* <Locate panTo={panTo} /> */}
      <Search
        panTo={panTo}
        placeIDToDetail={placeIDToDetail}
        addToTravel={addToTravel}
      />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => {
          // console.log(marker)
          return (
            <Marker
              key={`${marker.lat}-${marker.lng}`}
              position={{ lat: marker.lat, lng: marker.lng }}
              onClick={() => {
                setSelected(marker);
              }}
              icon={{
                url: `/bear.svg`,
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(15, 15),
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          );
        })}

        {selected ? (
          <InfoWindow
            position={{ lat: selected.lat, lng: selected.lng }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>
                <span role="img" aria-label="bear">
                  🐻
                </span>{" "}
                Alert
              </h2>
              <p>Spotted {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>
        ) : null}

        {travel.map((spot) => {
          return (
            <Marker
              key={`${spot.lat}-${spot.lng}`}
              position={{ lat: spot.lat, lng: spot.lng }}
            ></Marker>
          );
        })}

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
  );
};

const Locate = ({ panTo }) => {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
};

export default Map;
