import axios from 'axios';

const instance = axios.create({baseURL: `http://localhost:5000/`,});

const CreateTravel = async (NewTravel) => {

  try
  {
    console.log("cool")
   
    const {data:{message}} = await instance.post('/api/create-travel', {params:{NewTravel }});
    console.log(message)
    return message
    
  }
  catch(err)
  {
    console.log("error!!",err)
  }


  
  }


  const MutateTravel = async (NewTravel) => {

    try
    {
      console.log("cool")
     
      const {data:{message}} = await instance.post('/api/mutate-travel', {params:{NewTravel }});
      console.log(message)
      return message
      
    }
    catch(err)
    {
      console.log("error!!",err)
    }
  
  }


  const QueryTravelName = async () => {

    try
    {
      console.log("cool")
      const {data:{message}} = await instance.post('/api/query-travelname');
      //console.log(message)
      let options=message.map( (item)=>{return{value:item.name,label:item.name}})
      console.log(options)
      return options
     
    
      
    }
    catch(err)
    {
      console.log("error!!",err)
    }
  
  }


  const QueryTravelDetail = async (Name) => {

    try
    {
      console.log("cool")
      const {data:{message}} = await instance.post('/api/query-traveldetail',{params:{Name}});
      //console.log(message.spots)
      let travel=message.spots
      let newtravel=travel.map((spot)=>{ delete spot._id 
                                  return(spot)})
       //console.log(newtravel) 
      return newtravel
    
      
    }
    catch(err)
    {
      console.log("error!!",err)
    }
  
  }

  



export {CreateTravel,MutateTravel,QueryTravelDetail,QueryTravelName};