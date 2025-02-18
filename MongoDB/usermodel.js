const mongoose = require('mongoose')

mongoose.connect(`mongodb://localhost:27017/mongopractice`)

//schema
const userSchema = mongoose.Schema({
    name: String,
    username: String,
    email: String
})

//modal
module.exports = mongoose.model("user", userSchema);