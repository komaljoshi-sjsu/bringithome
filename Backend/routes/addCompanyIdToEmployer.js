//edit employer profile
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require("../config/mysql_connection");

router.post("/addCompanyIdToEmployer", (req, res) => {
        const employerId = req.body.employerId;
        const companyId = req.body.companyid;
        console.log(companyId)
        // const companyName = req.body['companyName'];
        // const about = req.body['about'];
        // const ceo = req.body['ceo'];
        // const founded = req.body['founded'];
        // const companySize = req.body['companySize'];
        // const revenue = req.body['revenue'];
        // const industry = req.body['industry'];
        // const companyDescription = req.body['companyDescription'];
        // const mission = req.body['mission'];
        // const workCulture = req.body['workCulture'];
        // const companyValues = req.body['companyValues'];
        // const website = req.body['website'];
        // const headquarters = req.body['headquarters'];
        // const companyType = req.body['companyType'];
        // const employerId = req.body['employerId'];
      
        let sql1 = "UPDATE Employer SET companyId = " +mysql.escape(companyId)
         +" WHERE id = " +mysql.escape(employerId);
        // //console.log(sql1);
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
                res.end("Company ID Added!");
            }            
        });
    });
    module.exports = router;