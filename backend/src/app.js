const express = require ('express');
const cors  = require('cors');
const app = express();


app.use(cors({
    origin:" http://localhost:5173",
    credentials:true
}));


app.use(express.json()); // Middleware it bring data from req.body
app.get('/',(req,res) => {
    res.send("Hello World")
})

module.exports = app;