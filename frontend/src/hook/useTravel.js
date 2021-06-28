import { useState } from "react";

const useTravel = () => {
  const [travel, setTravel] = useState([]);

  const reorderTravel = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const addToTravel = (spot, planName) => {
    let transformSpot = {
      name: spot.name,
      travel: planName,
      arriveTime: "4:10",
      departureTime: "5:25",
      todo: "none",
      cost: "50",
      lat: spot.lat,
      lng: spot.lng,
      placeId: spot.place_id,
      formatted_address: spot.formatted_address,
      photoURL: spot.photos[0].getUrl(),
    };
    console.log(transformSpot);
    setTravel((current) => [...current, transformSpot]);

    ///setTravel((current) => [...current,spot]);
  };

  const deleteOneSpot = () => {
    setTravel((current) => {
      current.splice(-1, 1);
      console.log(current);

      return current;
    });
  };

  return { travel, addToTravel, deleteOneSpot, reorderTravel, setTravel };
};

export default useTravel;
