import React from "react";



function SelfMarker({ travel,Marker,DirectionsService,DirectionsRenderer,response,directionsCallback }){


if(travel.length===0) //如果travel是空陣列
{
    return(<div></div>)
}
else
{
    if(travel.length===1)
    {
        return(<Marker
            key={`${travel[0].lat}-${travel[0].lng}`}
            position={{ lat: travel[0].lat, lng: travel[0].lng }}
          />)
    }
    else{
        let origin=travel[0].name
        let destination=travel[travel.length-1].name
        let waypoints=travel.slice(1,travel.length-1)
        waypoints=waypoints.map( (point)=>{  return({location:point.name})} ).reverse()

        return(

            <>
                <DirectionsService
                  // required
                  options={{ 
                    destination: origin,
                    origin: destination,
                    
                    travelMode: "DRIVING",
                    //waypoints: [{location: "台北101"},{location: "台灣大學"}],
                    waypoints:waypoints,
                    
                  }}
                  // required
                  callback={directionsCallback}
                  // optional
                  onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                  }}
                  // optional
                  onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                  }}
                />

            <DirectionsRenderer
                  // required
                  options={{ 
                    directions: response
                  }}
                  // optional
                  onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                  }}
                  // optional
                  onUnmount={directionsRenderer => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                  }}
                />
            </>

        )
        


    }


}


}



export default SelfMarker