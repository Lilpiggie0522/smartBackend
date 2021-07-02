const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const signIn = require('./controllers/signIn');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'jeffrey',
        password : '',
        database : 'smart-brain'
}});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users:[
        {
            id:'123',
            name:'john',
            email:'john@gmail.com',
            password:'cookies',
            entries:0,
            joined: new Date()
        },
        {
            id:'124',
            name:'sally',
            email:'sally@gmail.com',
            password:'bananas',
            entries:0,
            joined: new Date()
        }
    ]
}
// root route
app.get('/',(req,res)=>{
    res.json(database.users)
})

// We need to have a few different routes for various type of requests

// first one being the signin, since we do not want to use qurey string, we need to use a proper post request.

app.post('/signin', signIn.handleSignIn(db,bcrypt));

// Register is also a post request
app.post('/register',(req,res)=> {register.handleRegister(req,res,db,bcrypt)})

// Profile userID grab
app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)});

// Updating their entries
app.put('/image',(req,res)=> {image.handleImage(req,res,db)});

app.post('/imageurl',(req,res)=> {image.handleApiCall(req,res)});

////

app.listen(3000,() => {
    console.log('app is running on port 3000');
})