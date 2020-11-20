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
  db.select('email' , 'hash').from('login')
    .where('email','=', req.body.email)
    .then(data =>{
      const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
      if(isValid) {
        return db.select('*').from('users')
          .where('email','=',req.body.email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json('unable to get user'));
      }else {
        res.status(400).json('Wrong credentials');
      }
    })
    .catch(err => res.status(400).json('Wrong credentials'));
});

app.post('/register' , (req,res) => {
 const {name,email,password} = req.body;
 const hash = bcrypt.hashSync(password,10);

 db.transaction(trx => {
  trx.insert({
    hash: hash,
    email: email
  })
  .into('login')
  .returning('email')
  .then(loginEmail => {
    return trx('users')
      .returning('*')
      .insert({
        name: name,
        email: loginEmail[0],
        joined: new Date()
      })
      .then((user) => {
        res.json(user[0]);
      });
  })
  .then(trx.commit)
  .catch(trx.rollback)
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
  db('users').where({ id: id })
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if(entries[0].length){
        res.json(`Updated Entries to ${entries}`);
      }     
    })
    .catch((err) => res.status(400).json('unable to get entries'));
});

app.listen(SERVER_PORT, ()=>{
  console.log('app running on port ' + SERVER_PORT)
});