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

import { Card, Avatar, Button, Col, Row } from "antd";
import "antd/dist/antd.css";

import InnerCard from "./InnerCard";

import useCardSpot from "../hook/useCardSpot.js";
import ClearSearchButton from "./ClearSearchButton";

const { Meta } = Card;

const Search = ({
  panTo,
  placeIDToDetail,
  addToTravel,
  planName,
  SearchNearby,
  suggestions,
  setSuggestions,
  // loadError,
  // isLoaded,
}) => {


  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
        } 
  = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6532, lng: () => -79.3832 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const { cardSpot, setCardSpot } = useCardSpot();
  const [inputValue, setInputValue] = useState("");

  const handleInput = (e) => {
    //將正在打的字給usePlacesAutocoplete的value，讓他去找並丟suggestion
    //console.log(e.target.value.length)
    setValue(e.target.value);
    //setInputValue(e.target.value)
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
      console.log("res", results);
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
    setInputValue("");
  };

  const onSearch = async () => {
    //setValue(inputValue);
    let x = document.getElementById("myInput");
    //console.log(x.value)
    if (!(!x.value || x.value.trim().length === 0)) {
      //如果字串不為空
      //console.log(x.value)

      SearchNearby(x.value);
    }
  };

  // if (loadError) return "Error";
  // if (!isLoaded) return "Loading...";

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <div className="flex md:space-x-4">
          <ComboboxInput
            //value={inputValue}
            value={value}
            onChange={handleInput}
            disabled={!ready}
            placeholder="Search location"
            id="myInput"
          ></ComboboxInput>

          <ClearSearchButton
            cleanInput={cleanInput}
            setCardSpot={setCardSpot}
            setSuggestions={setSuggestions}
          />

        </div>

        <ComboboxPopover portal={false}>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>

      {cardSpot ? (
        <InnerCard
          spotName={cardSpot.name}
          spotAddress={cardSpot.formatted_address}
          photoUrl={cardSpot.photos[0].getUrl()}
          addToTravel={addToTravel}
          setCardSpot={setCardSpot}
          cardSpot={cardSpot}
          setSuggestions={setSuggestions}
          planName={planName}
          cleanInput={cleanInput}
          
        />
      ) : null}
      <div className="flex h-full scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-300 overflow-x-scroll">
        {suggestions.map((suggestion) => {
          return (
            <InnerCard
              spotName={suggestion.name}
              spotAddress={suggestion.formatted_address}
              photoUrl={suggestion.photos[0].getUrl()}
              addToTravel={addToTravel}
              cardSpot={suggestion}
              setSuggestions={setSuggestions}
              setCardSpot={setCardSpot}
              planName={planName}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
