import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";
import "@reach/combobox/styles.css";
import { useState } from "react";

import { Card, Avatar, Button } from "antd";
import "antd/dist/antd.css";

import InnerCard from "./InnerCard";

import useCardSpot from "../hook/useCardSpot.js";
import ClearSearchButton from "./ClearSearchButton";

const { Meta } = Card;

const Search = ({
  panTo,
  placeIDToDetail,
  addToTravel,
  planName
  // loadError,
  // isLoaded,
}) => {

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const { cardSpot, setCardSpot } = useCardSpot();

  const handleInput = (e) => {
    //將正在打的字給usePlacesAutocoplete的value，讓他去找並丟suggestion
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    //將選擇的字setvalue，並拿到選得的結果(address)
    setValue(address, false);
    clearSuggestions();
    console.log(address);

    try {
      const results = await getGeocode({ address });
      //const { lat, lng } = await getLatLng(results[0]);
      //panTo({ lat, lng });
      const latlng = await getLatLng(results[0]);
      panTo(latlng);

      //console.log(results[0].place_id)
      placeIDToDetail(latlng, results[0].place_id, setCardSpot);
      document.getElementById("card").style.display = "block";
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  const cleanInput = () => {
    setValue("");
  };

  // if (loadError) return "Error";
  // if (!isLoaded) return "Loading...";
  

  return (
    <div className="search">
      {cardSpot ? (
        <Card title="Seraching Result" id="card">
          <InnerCard
            spotName={cardSpot.name}
            spotAddress={cardSpot.formatted_address}
            photoUrl={cardSpot.photos[0].getUrl()}
            cardSpot={cardSpot}
            addToTravel={addToTravel}
            setCardSpot={setCardSpot}
            planName={planName}
          />
        </Card>
      ) : null}
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        ></ComboboxInput>

        <p>
          <ClearSearchButton
            cleanInput={cleanInput}
            setCardSpot={setCardSpot}
          />
        </p>

        <ComboboxPopover portal={false}>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

export default Search;
