// Listen on a specific host via the HOST environment variable
// const host =  "0.0.0.0";
// Listen on a specific port via the PORT environment variable
const port = 8080;
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(process.env.PORT,()=>{
  console.log("server running on port ",port);
});

// Setup Server for cors-anywhere
// const cors_proxy = require('cors-anywhere');
// cors_proxy.createServer({
//     originWhitelist: [],
//     requireHeader: ['origin', 'x-requested-with'],
//     removeHeaders: ['cookie', 'cookie2']
// }).listen(port, host, function() {
//     console.log('Running CORS Anywhere on ' + host + ':' + port);
// });
// const server = app.listen(port, listening);
// function listening(){
//     // console.log(server);
//     console.log(`running on localhost: ${port}`);
// };

app.get("/getAll", (request, response) => {
  response.send(projectData);
});
