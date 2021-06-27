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
    
    setTravel((current) => [...current,spot]);
  };

  const deleteOneSpot = () => {

    setTravel((current)=>{   current.splice(-1,1); return(current)});
  };







  return { travel, addToTravel, deleteOneSpot, reorderTravel, setTravel };
};

export default useTravel;
