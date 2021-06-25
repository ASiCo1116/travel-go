import { useState } from "react"; 

const useCardSpot=()=>{

    const[cardSpot,setCardSpot]=useState(null)




    return{cardSpot,setCardSpot};
};

export default useCardSpot;