var express = require('express')
// var cors = require('cors')
var app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoute');
const orderRoutes = require('./routes/orderRoute');
var cookieParser = require('cookie-parser')
const path = require('path')

//set static folder
app.use(express.static(path.join(__dirname, 'public')));


//MIDDLEWARES
// app.use(cors());
app.use(express.json());
app.use(cookieParser());



//routes
app.use("/api/auth",authRoutes);
app.use("/api/order",orderRoutes);


//database connection
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
    .then((result) => {
        var PORT = process.env.PORT || 5000;
        var server = app.listen(PORT);
        // server.timeout = 1800000; 
        console.log("DB Connected");
    })
    .catch(err => console.log(err));

    //404 not found
app.use((req, res) => {
    return res.status(404).json({error: "URL not found"});
})