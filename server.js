import express from 'express';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import knex from 'knex';
// Controllers
import {handleRegister} from './controllers/register.js';
import {handleSignIn} from './controllers/signin.js';
import {updateEntries} from './controllers/entries.js';
import {viewProfile} from './controllers/profile.js';

// Connect Database
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


// ROUTES
app.post('/signin', handleSignIn(db,bcrypt));

app.post('/register' , handleRegister(db,bcrypt));

app.get('/profile/:id', viewProfile(db));

app.put('/image', updateEntries(db));

app.listen(SERVER_PORT, ()=>{
  console.log('app running on port ' + SERVER_PORT)
});