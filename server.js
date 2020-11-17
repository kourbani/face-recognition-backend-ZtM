import express from 'express';

const SERVER_PORT = 3000;

const app = express();
app.use(express.json());

// DATABASE
const database = {
  users: [
    {
      id: '123',
      name: 'John',
      email: 'john@gmail.com',
      password: 'cookies',
      entries: 0,
      joined: new Date(),
    },
    {
      id: '124',
      name: 'Sally',
      email: 'sally@gmail.com',
      password: 'bananas',
      entries: 0,
      joined: new Date(),
    }
  ]
};

// ROUTES
app.get('/', (req,res) => {
  res.send('app is working');
});


app.listen(SERVER_PORT, ()=>{
  console.log('app running on port ' + SERVER_PORT)
});