//Require express dependencies
var express = require('express');

//Require module of employee from employee.js file
var empModel = require('../modules/employee');

//creat a object of route
var router = express.Router();

//query for find result from collection
var employee=empModel.find({});




// start routing.... 

router.get('/', function(req, res, next) {

  //execute object employee to fetch data
  employee.exec(function(err,data){
      if(err) throw err;   //throw err if occur
        res.render('index', { title: 'Employee Records',records:data}); //render data for ejs page
      
  });
  
});

//creating route for post methods 

router.post("/",function(req,res,next){

//creat a object of employee model

  var empDetails = new empModel({
    name: req.body.uname,           //take value from ejs view from
    email:req.body.email,
    etype:req.body.emptype,
    hourlyrate:req.body.hrlyrate,
    totalHour:req.body.ttlhr,
    total:parseInt(req.body.hrlyrate)*parseInt(req.body.ttlhr),       //which indicate data in Number Form
  });

  empDetails.save( function(err,res1){              // Use empDetails.save() to store data into database   and also refresh the table by using function(err,res1)    
    if(err)  throw err;                             //if err is occure
    employee.exec(function(err,data){               //
      if(err) throw err;                            //throw err if occur
        res.render('index', { title: 'Employee Records',records:data}); //render data for ejs page
      

  });
  // console.log(empDetails);


 
});  

});



router.post("/search/",function(req,res,next){

      var flrtname = req.body.fltrname;     //fetch value of name from ejs search from
      var flrtemail = req.body.fltremail;

  // search from database using or opertaions
      var employeeFilter=empModel.find({$or:[{name:flrtname},{email:flrtemail}]});

      // execute the query
      employeeFilter.exec(function(err,data){               
        if(err) throw err;                            
          res.render('index', { title: 'Employee Records',records:data}); 
        });  
});
  




//Export route module
module.exports = router;
