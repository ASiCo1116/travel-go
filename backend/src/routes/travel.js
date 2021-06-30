import { Router } from 'express';
import db from '../models/db.js'


const router = Router();
//let SpotModel= db.SpotModel
//let TravelModel= db.TravelModel


router.post('/create-travel',async function(req,res){
    
    
    try{
        const { params: {NewTravel,user } }=req.body;
        if (NewTravel.length===0)
        {
          res.json({status:false,message:"Empty Plan is not accepted" })
        }
        
        else{
        const travelname=NewTravel[0].travel
        let existing=await db.TravelModel.findOne({name:travelname})
        if(!existing)//如果不存在的話創一個 新的travel
        {
          const newTravel = new  db.TravelModel({ name:travelname, spots:[] });//先創一個travel物件
          await newTravel.save()


          let newSpots=[]
          NewTravel.map( (spot)=>{ 
  
              const spotObj = new  db.SpotModel({  //利用前端傳來的資料製作spot物件
                name:spot.name, 
                travel:newTravel,
                arriveTime:spot.arriveTime,
                departureTime:spot.departureTime ,
                todo:spot.todo ,
                lat:spot.lat ,
                lng:spot.lng ,
                placeId: spot.placeId,
                formatted_address:spot.formatted_address ,
                photoURL:spot.photoURL});  
  
                newSpots.push(spotObj)//將spot物件放入陣列
                //console.log(newSpots)
                //console.log("###############################s")
                
  
                spotObj.save()
           }  )

          await db.TravelModel.findOneAndUpdate({name:travelname},{spots:newSpots})//更新travel物件

          
          let userobj=await db.UserModel.findOne({name:user})
          let x =userobj.travels
          x.push(newTravel)
          //console.log("NewTravelll",x)
          await db.UserModel.findOneAndUpdate({name:user},{travels:x})//重新更新User物件


          res.json({status:true,message:`Creating new Travel:${travelname} of ${user}`})
        } 
        else//如果有的話回傳說名字重複
        {
          res.json({status:false,message:`The travel is exist, please change other name` })
        } 
   
        }
      }
      catch(e)
      {
        console.log(e)
        res.json({status:"e", message: 'Something went wrong...' });
      }

})


router.post('/mutate-travel',async function(req,res){
    
  try{


      const { params: {NewTravel,user } }=req.body;
      console.log(NewTravel,user) 
      //console.log(typeof(NewTravel[0].lat),typeof(NewTravel[0].lng),typeof(NewTravel[1].lat),typeof(NewTravel[1].lng),typeof(NewTravel[2].lat),typeof(NewTravel[2].lng)) 
      
      if (NewTravel.length===0)
      {
        res.json({status:false,message:"Empty Plan is not accepted" })
      }
      
      else{

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
         
         
         let NewTravelObj=await db.TravelModel.findOneAndUpdate({name:travelname},{spots:newSpots}, {
          new: true
        })//重新更新travel物件

      


         res.json({status:true,message:"Save Success" });

      }
    }
    catch(e)
    {
      console.log(e)
      res.json({ status:false,message: 'Something went wrong...' });
    }
    

})

router.post('/query-travelname',async function(req,res){
  try{
    const { params: {userName } }=req.body;
    const user=await  queryTravelWIthUserName (userName)
    console.log("this is user",user)
    console.log("##########################")
    res.json({ message: user })
          
    
           
    }
    catch(e)
    {
      console.log(e)
      res.json({ message: 'Something went wrong...' });
    }
    

})

const queryTravelWIthUserName = async (name) => {
  let existing=await db.UserModel.findOne({name})
  console.log(existing)
  return  existing
                .populate('travels')
                .execPopulate()

};





router.post('/query-traveldetail',async function(req,res){
  try{
          const { params: {Name } }=req.body;
          console.log(Name[0])
          const travel=await queryTravelDetailWIthName (Name[0])
          console.log("############this is travel###############")
          console.log(travel)
          res.json({ message: travel })
          
    
           
    }
    catch(e)
    {
      console.log(e)
      res.json({ message: 'Something went wrong...' });
    }
    

})

const queryTravelDetailWIthName = async (name) => {
  let existing=await db.TravelModel.findOne({name})
  console.log(existing)
  return  existing
                .populate('spots')
                .execPopulate()

};



router.post('/create-user',async function(req,res){
  try{
    const { params: {userName } }=req.body;
    console.log(userName)
    let existing=await db.UserModel.findOne({name:userName})
    console.log(existing)


     if(!existing)//如果不存在的話創一個 新的user
        {
          const newUser = new  db.UserModel({ name:userName });
          console.log("Created travel", newUser);
          //console.log("save return",newCard.save());會回傳一個promise
          newUser.save()

          res.json({message:`Adding User:${userName}` })
        } 
        else//如果有的話回傳說名字重複
        {
          console.log("hello")
          res.json({message:`The user is exist` })
        } 

    
    
           
    }
    catch(e)
    {
      console.log(e)
      res.json({ message: 'Something went wrong...' });
    }
    

})


router.post('/delete-travelname',async function(req,res){
  try{
    const { params: {PlanName,userName } }=req.body;
    console.log(PlanName,userName)
    let existingTravel=await db.TravelModel.findOne({name:PlanName})
    await db.SpotModel.deleteMany({travel:existingTravel })
    console.log("delete old spots")

    let user=await db.UserModel.findOne({name:userName })
    let x =user.travels
    console.log("travels before splice",x)
    x.map((item,index,x)=>{
      let y=JSON.stringify(item)
      let z=JSON.stringify(existingTravel._id)
      console.log("item:",y,typeof(y))
      console.log("existingTravel",z,typeof(z))

      if(y==z)
      {
        console.log("hi")
        x.splice(index,1) 
      }
    })
    console.log("travels after splice",x)
    await db.UserModel.findOneAndUpdate({name:userName},{travels:x})//重新更新User物件

    await db.TravelModel.findOneAndDelete({name:PlanName})//刪除travel物件


    res.json({ message: 'delete success' });
    
           
    }
    catch(e)
    {
      console.log(e)
      res.json({ message: 'Something went wrong...' });
    }
    

})









export default router;





