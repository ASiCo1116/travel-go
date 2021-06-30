import axios from 'axios';
import { Button, Drawer, Input, message, Cascader } from "antd";

const instance = axios.create({baseURL: `http://localhost:5000/`,});

const CreateTravel = async (NewTravel,user) => {

  try
  {
    console.log("cool")
   
    const {data:{message,status}} = await instance.post('/api/create-travel', {params:{NewTravel,user }});
    console.log(message)
    console.log(status)
    let res=message
    return {res,status}
    
  }
  catch(err)
  {
    console.log("error!!",err)
  }


  
  }


  const CreateUser = async (userName) => {

    try
    {
      console.log("cool")
      const {data:{message}} = await instance.post('/api/create-user', {params:{userName }});
      console.log(message)
      //return message
      
    }
    catch(err)
    {
      console.log("error!!",err)
    }
  
  
    
    }


  const MutateTravel = async (NewTravel,user) => {

    try
    {
      console.log("cool")
     
      const {data:{message,status}} = await instance.post('/api/mutate-travel', {params:{NewTravel,user }});
      console.log(message)
      let res=message
      return {res,status}
      
    }
    catch(err)
    {
      console.log("error!!",err)
    }
  
  }


  const QueryTravelName = async (userName) => {

    try
    {
      console.log("cool")
      const {data:{message}} = await instance.post('/api/query-travelname',{params:{userName}});
      let travels=message.travels
      
      //console.log(message)
      let options=travels.map( (item)=>{return{value:item.name,label:item.name}})
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

  const DeletePlan = async (TravelName,userName) => {

    try
    {
      console.log(TravelName)
      let PlanName=TravelName[0]
      console.log(PlanName)

      const {data:{message}} = await instance.post('/api/delete-travelname',{params:{PlanName,userName}});
      console.log(message)
      return message 
    
      
    }
    catch(err)
    {
      console.log("error!!",err)
    }
  
  }

  



export {CreateTravel,MutateTravel,QueryTravelDetail,QueryTravelName,CreateUser,DeletePlan};