import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";

dotenv.config();

function connectMongo() {
  //console.log('I am in mongo');
  //console.log(process.env.MONGO_URL)
  //mongoose.connect(process.env.MONGO_URL, {
  mongoose.connect("mongodb+srv://sam:sam861128@spot.l2qep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
 
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('mongo connected!');
  });
}

const mongo = {
  connect: connectMongo,
};

export default mongo;
