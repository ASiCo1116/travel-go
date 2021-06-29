import { Router } from 'express';
import db from '../models/db.js'


const router = Router();
//let SpotModel= db.SpotModel
//let TravelModel= db.TravelModel


router.post('/create-travel',async function(req,res){
    
    
    try{
        const { params: {name,spots } }=req.body;
        //console.log(name,spots) 
        let existing=await db.TravelModel.findOne({name})
        if(!existing)//如果不存在的話創一個 新的travel
        {
          const newTravel = new  db.TravelModel({ name, spots });
          console.log("Created travel", newTravel);
          //console.log("save return",newCard.save());會回傳一個promise
          newTravel.save()

          res.json({message:`Adding Travel:${name}` })
        } 
        else//如果有的話回傳說名字重複
        {
          res.json({message:`The travel is exist` })
        } 
   
      
      }
      catch(e)
      {
        console.log(e)
        res.json({ message: 'Something went wrong...' });
      }

})


router.post('/mutate-travel',async function(req,res){
    
  res.json({message:"Save Success" });
  
  try{


      const { params: {NewTravel } }=req.body;
      console.log(NewTravel) 
      //console.log(typeof(NewTravel[0].lat),typeof(NewTravel[0].lng),typeof(NewTravel[1].lat),typeof(NewTravel[1].lng),typeof(NewTravel[2].lat),typeof(NewTravel[2].lng)) 
      
      
      let travelname=NewTravel[0].travel
      //console.log(travelname)
      let existingTravel=await db.TravelModel.findOne({name:travelname})

      if(!existingTravel)//如果這個travel不存在的話，創一個
      {
        
      const newTravel = new  db.TravelModel({ name:travelname,spots:[] });
      console.log("Created travel", newTravel);
      //console.log("save return",newCard.save());會回傳一個promise
      await newTravel.save()
      existingTravel=newTravel

      }

   
        await db.SpotModel.deleteMany({travel:existingTravel })
        console.log("delete old spots")
        let newSpots=[]
        NewTravel.map( (spot)=>{ 

            const spotObj = new  db.SpotModel({  //利用前端傳來的資料製作spot物件
              name:spot.name, 
              travel:existingTravel,
              arriveTime:spot.arriveTime,
              departureTime:spot.departureTime ,
              todo:spot.todo ,
              lat:spot.lat ,
              lng:spot.lng ,
              placeId: spot.placeId,
              formatted_address:spot.formatted_address ,
              photoURL:spot.photoURL});  

              newSpots.push(spotObj)//將spot物件放入陣列
              console.log(newSpots)
              console.log("###############################s")
              

              spotObj.save()
         }  )
         
         
         //console.log(newSpots)
         
         
         await db.TravelModel.findOneAndUpdate({name:travelname},{spots:newSpots})//重新更新travel物件
         res.json({message:"Save Success" });

        



      

    
    }
    catch(e)
    {
      console.log(e)
      res.json({ message: 'Something went wrong...' });
    }
    

})







export default router;





