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
app.post('/signin', (req,res) => {
  handleSignIn(req,res,db,bcrypt);
});

app.post('/register' , (req,res) => {
  handleRegister(req,res,db,bcrypt);
});

app.get('/profile/:id', (req, res) => {
  viewProfile(req,res,db);
});

app.put('/image', (req, res) => {
  updateEntries(req,res,db);
});

app.listen(SERVER_PORT, ()=>{
  console.log('app running on port ' + SERVER_PORT)
});