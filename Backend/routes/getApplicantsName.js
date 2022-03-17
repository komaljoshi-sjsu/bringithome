//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
var mysql = require("mysql");
router.post('/getApplicantsName', function(req,res){ 
  console.log(req.body)
   const jobId = req.body.jobId;
   const compid = req.body.compid;
   let get_job = "SELECT name,j.id,status,a.jobId FROM JobSeeker j "+
   "JOIN AppliedJobs a on a.id = j.id "+ 
    "AND a.jobId = "+mysql.escape(jobId)+" AND a.companyId = "+mysql.escape(compid) ;
    //console.log(get_job)
 
    let job_query = connection.query(get_job, (error, result) => {

        if (error) {
            console.log(error.message)
           res.status(400).send("Server Error. Please Try Again! ");
        }  
            else{
            //console.log(result)
            res.status(200).send(JSON.stringify(result));	
            }
        });
   
    
});
module.exports = router;






