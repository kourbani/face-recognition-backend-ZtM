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

app.post('/signin', (req,res) => {
  if(req.body.email === database.users[0].email 
    && req.body.password === database.users[0].password){
      res.json('success');
    } else {
      res.status(400).json('error logging in');
    }
});

app.listen(SERVER_PORT, ()=>{
  console.log('app running on port ' + SERVER_PORT)
});