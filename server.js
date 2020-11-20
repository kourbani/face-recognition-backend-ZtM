import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';

const db=knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '',
    database : 'face_recognition'
  }
});

const SERVER_PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

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
  res.send(database.users);
});

app.post('/signin', (req,res) => {
  if(req.body.email === database.users[0].email 
    && req.body.password === database.users[0].password){
      res.json(database.users[0]);
    } else {
      res.status(400).json('error logging in');
    }
});

app.post('/register' , (req,res) => {
 const {name,email,password} = req.body;
 db('users')
 .returning('*')
 .insert({
   name: name,
   email: email,
   joined: new Date()
 }).then(user => {
    res.json(user[0]);
 })
 .catch(err => res.status(400).json('unable to register'));
});

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;
  db.select('*').from('users').where({
    id: id
  })
  .then(user => {
    if(user.length) {
      res.json(user[0]);
    } else {
      res.json('Not found');
    }
  })
  .catch(err=>res.status(400).json('error getting user'));
});

app.put('/image', (req, res) => {
  const { id } = req.body;
  let found = false;
  database.users.forEach((user) => {
    if (user.id === id) {
      found = true;
      user.entries++;
      return res.json(user.entries);
    }
  });
  if (!found) {
    res.status(400).json('not found');
  }
});

app.listen(SERVER_PORT, ()=>{
  console.log('app running on port ' + SERVER_PORT)
});