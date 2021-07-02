const Clarifai = require('clarifai')

const app = new Clarifai.App({
    apiKey: 'f95f77189da948d088f8aa3a93132cef'
   });

const handleApiCall = (req,res) => {
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'));
}

const handleImage = (req,res,db) => {
    const {id} = req.body;
    db('users')
    .where('id','=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries=>{
        res.json(entries[0])
    })
    .catch(err=>{
        res.status(400).json('error getting users!')
    })
    // let found = false;
    // database.users.forEach(user=>{
    //     if(id===user.id){
    //         found = true;
    //         user.entries++;
    //         return res.json(user.entries);
    //     }
    // })
    // if(!found){
    //     res.status(404).json('no such user!');
    // }
}

module.exports = {
    handleImage:handleImage,
    handleApiCall:handleApiCall
}