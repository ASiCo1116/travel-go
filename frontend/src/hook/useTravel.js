import { useState } from "react";

const useTravel = () => {
  const [travel, setTravel] = useState([]);

  const reorderTravel = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const addToTravel = (spot,planName) => {
    let transformSpot = {
      name: spot.name,
      travel: planName,
      arriveTime: "",
      departureTime: "",
      todo: "",
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

const addTime=(list,index,time,arrive)=>{
  const result = Array.from(list);
  const [removed]=result.splice(index,1)
  if(arrive)//調整arrive time
  {
    removed.arriveTime=time
    
  }
  else{
    removed.departureTime=time

  }
  result.splice(index,0,removed)
 

  return result

}


const addTodo=(list,index,todo)=>{
  const result = Array.from(list);
  const [removed]=result.splice(index,1)
  removed.todo=todo
  result.splice(index,0,removed)

  return result

}

  const deleteOneSpot = (list,index) => {
    const result = Array.from(list);
    result.splice(index,1)
    return result
  };

  const addPlanName=(list,planName)=>{
    const result = Array.from(list);
    let newResult=result.map( (item)=>{item.travel=planName}  )
    return newResult
  
  }


  return { travel, addToTravel, deleteOneSpot, reorderTravel, setTravel,addTime,addTodo,addPlanName };
};

export default useTravel;
