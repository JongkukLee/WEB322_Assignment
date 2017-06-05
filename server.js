/*********************************************************************************
* WEB322 – Assignment 03
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: _Jongkuk Lee__________ Student ID: _127730158____ Date: _2017-05-26_____
*
* Online (Heroku) Link: __https://arcane-fjord-78560.herokuapp.com/______________
********************************************************************************/

var express = require("express");
var app = express();
var dataService = require("./data-service.js");
var HTTP_PORT = process.env.PORT || 8080;

// to-do: 
app.use(express.static('public'));

// to-do: 
var path = require("path");

// call this function after the http server starts listening for requests
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// setup route to listen on /
app.get("/", function(req,res){
  res.sendFile(path.join(__dirname + "/views/home.html"));
});
// setup route to listen on /about
app.get("/about", function(req,res){
  res.sendFile(path.join(__dirname + "/views/about.html"));
});
// setup route to listen on /employees
app.get("/employees", (req, res) =>{

  //res.send("TODO: get all employees for department 1");
  if(req.query.status)
  {
    dataService.getEmployeesByStatus(req.query.status).then( (data) =>
    {
      for(var i = 0; i < data.length; i++)
      {
        //var employee = JSON.stringify(data[i]);
        res.json(data);
        //res.json({employee});
      }
    })
    .catch( (errorMsg)=> {
      res.json({message: errorMsg});
    });
    //res.json({message: req.query.status});
  }
  else if(req.query.manager)
  {
    dataService.getEmployeesByManager(req.query.manager).then( (data) =>
    {
      for(var i = 0; i < data.length; i++)
      {
        res.json(data);
      }
    })
    .catch( (errorMsg)=> {
      res.json({message: errorMsg});
    });    
    // res.json({message: req.query.manager});
  }
  else if(req.query.department)
  {
    dataService.getEmployeesByDepartment(req.query.department).then( (data) =>
    {
      for(var i = 0; i < data.length; i++)
      {
        res.json(data);
      }
    })
    .catch( (errorMsg)=> {
      res.json({message: errorMsg});
    });     
    //res.json({message: req.query.department});
  }
  else{
    dataService.getAllEmployees().then( (data) =>
    {
      //for(var i = 0; i < data.length; i++)
      //{
        res.json(data);
      //}
    })
    .catch( (errorMsg)=> {
      res.json({message: errorMsg});
    });
  }

});

// setup route to listen on /employee/value 
app.get("/employee/:empNum", (req,res) => {
    dataService.getEmployeeByNum(req.params.empNum).then( (data) =>
    {
      for(var i = 0; i < data.length; i++)
      {
        res.json(data);
      }
    })
    .catch( (errorMsg)=> {
      res.json({message: errorMsg});
    });
    //res.json({message: req.params.empNum});
});

// setup route to listen on /managers 
app.get("/managers", (req,res) => {
    dataService.getManagers().then( (data) =>
    {
      for(var i = 0; i < data.length; i++)
      {
        res.json(data);
      }
    })
    .catch( (errorMsg)=> {
      res.json({message: errorMsg});
    });
    //res.send("all the employees whose isManager property  is set to true");
});

// setup route to listen on /departments  
app.get("/departments", (req,res) => {
    dataService.getDepartments().then( (data) =>
    {
      for(var i = 0; i < data.length; i++)
      {
        res.json(data);
      }
    })
    .catch( (errorMsg)=> {
      res.json({message: errorMsg});
    });  
    //res.send("all of the departments within the departments.json file");
});

// setup the no matching route
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// setup http server to listen on HTTP_PORT
dataService.initialize().then( () => {
  app.listen(HTTP_PORT, onHttpStart);
})
.catch( (errorMsg) => {
  console.log("server.js::dataService.initialize().then().catch()");
  console.log(errorMsg);
});
