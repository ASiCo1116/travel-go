import mongoose from 'mongoose'

const { Schema } = mongoose;

const travelSchema = new Schema({
  name: { type: String, required: true },
  spots: [{ type: mongoose.Types.ObjectId, ref: 'Spot' }],
});

const spotSchema = new Schema({
  name:{type: String},  
  travel:{type: mongoose.Types.ObjectId, ref:'Travel'},
  arriveTime:{type: String},
  departureTime:{type: String},
  todo:{type: String},
  lat:{type: Number, required: true},
  lng:{type: Number, required: true},
  placeId:{type: String, required: true},
  formatted_address:{type: String},
  photoURL:{type: String}
});

const userSchema = new Schema({
  name: { type: String, required: true },
  travels: [{ type: mongoose.Types.ObjectId, ref: 'Travel' }],
});




const SpotModel = mongoose.model('Spot', spotSchema);
const TravelModel = mongoose.model('Travel', travelSchema);
const UserModel = mongoose.model('User', userSchema);




const db = {
    SpotModel,
    TravelModel,
    UserModel

};





export  default db ;
