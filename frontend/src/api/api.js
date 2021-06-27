import axios from 'axios';

const instance = axios.create({baseURL: `http://localhost:5000/`,});

const CreateTravel = async (name) => {

    try
    {
     // console.log("cool")
     let spots=[]
      const { data: { message }, } = await instance.post('/api/create-travel', {params:{name,spots }});
      console.log(message,)
      //return {message}
      
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
     
      const { data: { message }, } = await instance.post('/api/mutate-travel', {params:{NewTravel }});
      //console.log(message)
      //return {message}
      
    }
    catch(err)
    {
      console.log("error!!",err)
    }
  
  }


  





export {CreateTravel,MutateTravel};