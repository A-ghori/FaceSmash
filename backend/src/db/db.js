const mongoose = require('mongoose');
require('dotenv').config();


const mongoURI = process.env.MONGO_URI;

function ConnectDb(){
    mongoose.connect(mongoURI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB connected successfully");
    }) .catch((err)=>{
        console.log("MongoDB connection error:", err)
    })
}

module.exports = ConnectDb;