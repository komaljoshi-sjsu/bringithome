//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
var mysql = require("mysql");
const jobSeeker = require('../models/JobSeeker');

router.post('/getJobSeekerProfile', function(req,res){
    //var res = {status: '', jobseekerData : []};
    var jobseekerData = [];
    const jobSeekerId = req.body.id;
    console.log(req.body.id)
    let sql1 = "SELECT email,jobSeekerContact from JobSeeker WHERE id = "+mysql.escape(jobSeekerId);
    let query = connection.query(sql1, (error, result) => {

    if (error) {
        
        res.status(400).send("Server Error. Please Try Again! ");
        }
   
        else{
            
                let profile = {
                    email : result[0].email,
                    jobSeekerContact : result[0].jobSeekerContact,
                   
                };
                jobseekerData.push(profile);
            
            console.log(jobseekerData)
            // jobseekerData.concat(JSON.stringify(result))
            //res.status(200).send(JSON.stringify(result));	
        }
		//console.log(JSON.stringify(result));	
		
	});

    jobSeeker.find({ jobSeekerId: req.body.id },(error, getjobpreference) => {

        if (error) {
           res.status = '500';
           callback(null,res)
        }
        if (getjobpreference) {
          //jobseekerData.concat(getjobpreference[0].jobPreference)
           
           let profile1 = {
            JobTitle : getjobpreference[0].jobPreference['Job Title'],
            JobTypes : getjobpreference[0].jobPreference['Job Types'],
            WorkSchedules :getjobpreference[0].jobPreference['Work Schedules'],
            pay:getjobpreference[0].jobPreference['Pay'],
            relocation:getjobpreference[0].jobPreference['Relocation'],
            remote:getjobpreference[0].jobPreference['Remote'],
        };
        jobseekerData.push(profile1);
        }
        res.status(200).send(jobseekerData)
    })
    
});
module.exports = router;






