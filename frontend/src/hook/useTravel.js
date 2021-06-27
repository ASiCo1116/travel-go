import { useState } from "react";

const useTravel = () => {
  const [travel, setTravel] = useState([]);

  const reorderTravel = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const addToTravel = (spot) => {
    setTravel((current) => [spot, ...current]);
  };

  const deleteOneSpot = () => {
    setTravel([
      {
        lat: 25.032969,
        lng: 121.565414,
      },
    ]);
  };

  return { travel, addToTravel, deleteOneSpot, reorderTravel, setTravel };
};

export default useTravel;
