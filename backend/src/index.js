import mongo from './mongo.js';
import express from 'express';
import cors from 'cors';
import routes from './routes/travel.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

mongo.connect();

const server = app.listen(process.env.PORT || 5000, function () {
  console.log('Listening on port ' + server.address().port);
});

