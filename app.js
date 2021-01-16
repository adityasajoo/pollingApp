const express = require("express");
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const exphbs = require('express-handlebars');
const path = require('path');
require('dotenv').config({path:path.join(__dirname,'./.env')});
const mongoConfig = require('./config/mongoConfig');
const startio = require('./socket');

//configure mongodb
mongoConfig();
//start socket
startio(io);

//serve public folder
app.use(express.static(path.join(__dirname, './public')));

//configure handlebars
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set("view engine", 'hbs');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//Routes
app.use("/",require('./routes/poll'));

//Start the app
const PORT = process.env.PORT;
http.listen(PORT,console.log(`Running in port : ${PORT}`));