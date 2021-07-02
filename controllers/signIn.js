const handleSignIn = (db,bcrypt) => (req,res) => {
    const {email,password} = req.body
    // bcrypt.compare('piggie', '$2a$10$32N72V0k25yxaIkgfaKMAucE7moG5Ad25ESLyLEEcpt8j7JiXAUUi', function(err, res) {
    //     // res == true
    //     console.log('the first attempt',res);
    // });
    // bcrypt.compare("veggies", '$2a$10$32N72V0k25yxaIkgfaKMAucE7moG5Ad25ESLyLEEcpt8j7JiXAUUi', function(err, res) {
    //     // res = false
    //     console.log('the second attempt', res);
    // });

    // if((req.body.email===database.users[0].email&&req.body.password===database.users[0].password)||(req.body.email===database.users[1].email&&req.body.password===database.users[1].password)){
    //     res.json(database.users[0]);
    // }
    // else{
    //     res.status(400).json('error logging in!')
    // }
    db.select('email','hash')
    .from('login')
    .where('email','=',email)
    .then(data=>{
        console.log(data)
        const isValid = bcrypt.compareSync(password,data[0].hash);
        if(isValid){
            return db.select('*').from('users')
            .where('email','=',email)
            .then(theUser=>{
                res.json(theUser[0])
            }).catch(err => {
                res.status(400).json('unable to get user!');
            })
        }
        else{
            res.status(400).json('wrong credentials!')
        }
    }).catch(err =>
        res.status(400).json('wrong credentials!'))
}

module.exports = {
    handleSignIn:handleSignIn
}