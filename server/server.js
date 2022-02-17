// Listen on a specific host via the HOST environment variable
const host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
const port = process.env.PORT || 8080;
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// const port = 8081;

// Setup Server
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

app.get('/getAll', (request, response) => {
    res.send(projectData);

    // const db = dbService.getDbServiceInstance();

    // const result = db.getAllData();
    
    // result
    // .then(data => response.json({data : data}))
    // .catch(err => console.log(err));
})
app.get('/data', function (req, res) {
    //replace url with a string of the get rout url
    //send response data of endpoint object
    console.log("server get", res);

    res.send(projectData);
  })

app.post('/add',(req,res)=>{
   //replace url with string of post rout url
   console.log("server post",req.body.main.temp);
   //add data to endpoint object
  projectData={temp:req.body.main.temp};
   //projectData.push(req.body.main.temp);
   res.send(projectData);
   //add user feeling and date also 
})
  