import "@reach/combobox/styles.css";
import React from "react";
import useCardSpot from"../hook/useCardSpot.js"

function ClearSearchButton({cleanInput,setCardSpot}){

  
    return (
        <button
          className="clearsearch"
          onClick={() => {  console.log("cool")
                            cleanInput()
                            let card=document.getElementById("card");
                            if(card) //如果是null不會進去
                            {
                              card.style.display="none"
                            }
                            
                            setCardSpot(null)
                          //console.log(cardSpot) 
                         }}
        >
          <img src="/close.svg.png" alt="close" />
        </button>
      );

}

export default  ClearSearchButton