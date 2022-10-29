// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

// Start up an instance of app

const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8120;
const myServer = app.listen(port, listining);

function listining() {
  console.log("Server Runing ");
  console.log(`server running in localhost : http://localhost:${port} `);
}

//get request
app.get("/data", getData);

function getData(req, res) {
  res.send(projectData);
  //projectData=[]
}

//post request

app.post("/add", postData);

function postData(req, res) {
  projectData = req.body;
  res.send(projectData);
}
