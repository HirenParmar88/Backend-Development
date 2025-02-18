const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/project1')

const userSchema=mongoose.Schema({
    image: String,
    email: String,
    city: String,
})

const userModel=mongoose.model('user',userSchema)
module.exports