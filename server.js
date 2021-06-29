const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
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

app.post('/signin',(req,res) => {
    bcrypt.compare('piggie', '$2a$10$32N72V0k25yxaIkgfaKMAucE7moG5Ad25ESLyLEEcpt8j7JiXAUUi', function(err, res) {
        // res == true
        console.log('the first attempt',res);
    });
    bcrypt.compare("veggies", '$2a$10$32N72V0k25yxaIkgfaKMAucE7moG5Ad25ESLyLEEcpt8j7JiXAUUi', function(err, res) {
        // res = false
        console.log('the second attempt', res);
    });

    if((req.body.email===database.users[0].email&&req.body.password===database.users[0].password)||(req.body.email===database.users[1].email&&req.body.password===database.users[1].password)){
        res.json(database.users[0]);
    }
    else{
        res.status(400).json('error logging in!')
    }
});


// Register is also a post request
app.post('/register',(req,res) => {
    const {email,name,password} = req.body;

    database.users.push({
        id:'125',
        name:name,
        email:email,
        password:password,
        entries:0,
        joined: new Date()    
    })
    res.json(database.users[database.users.length-1])
})

// Profile userID grab
app.get('/profile/:id',(req,res) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user=>{
        if(user.id===id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(404).json('no such user!');
    }
});

// Updating their entries
app.put('/image',(req,res)=>{
    const {id} = req.body;
    let found = false;
    database.users.forEach(user=>{
        if(id===user.id){
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(404).json('no such user!');
    }
})

////

bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

app.listen(3000,() => {
    console.log('app is running on port 3000');
})