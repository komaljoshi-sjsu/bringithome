//edit employer profile
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require("../config/mysql_connection");

router.post("/updateJobSeekerStatus", (req, res) => {
    console.log(req.body)
         const id = req.body.id;
         const status = req.body.status;
         const jobId = req.body.jobId;
        // const address = req.body['address'];
        // const city = req.body['city'];
        // const state = req.body['state'];
        // const country = req.body['country'];
        // const zipcode = req.body['zipcode'];
        // // console.log(address);
        
        let sql1 = "UPDATE AppliedJobs SET  status= " +mysql.escape(status)
        
        +" WHERE id = "+mysql.escape(id)+" AND jobId = "+mysql.escape(jobId);
        console.log(sql1);
        let query = connection.query(sql1, (error, result) => {
            if (error) {
                res.writeHead(500,{
                    'Content-Type' : 'application/json'
                });
                //console.log(error.message);
                res.end("Server Error. Please Try Again! ");
            } else {
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                });
                console.log(result)
                res.status(200).end(" Job Seeker status updated");
            }            
        });
    });
    module.exports = router;