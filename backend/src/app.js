const express = require ('express');
const cors  = require('cors');
const app = express();
const adminRoutes = require('./routes/admin.routes');

app.use(cors({
    origin:" http://localhost:5173",
    credentials:true
}));


app.use(express.json()); // Middleware it bring data from req.body
app.get('/',(req,res) => {
    res.send("Hello World")
})
app.use('/api/admin',adminRoutes)

module.exports = app;