import express from 'express';

const SERVER_PORT = 3000;

const app = express();

app.listen(SERVER_PORT, ()=>{
  console.log('app running on port ' + SERVER_PORT)
});