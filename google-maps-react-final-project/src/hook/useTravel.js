import { useState } from "react"; 

const useTravel=()=>{

    const[travel,setTravel]=useState([])


    const addToTravel=(spot)=>{
        setTravel( (current)=>[spot,...current]  )

    }

    const deleteOneSpot=()=>{
        setTravel( [{
            lat:25.032969,
            lng:121.565414,
          }]  )

    }




    return{travel,addToTravel,deleteOneSpot};
};

export default useTravel;