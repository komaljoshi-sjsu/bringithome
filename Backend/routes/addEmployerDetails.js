//edit employer profile
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require("../config/mysql_connection");

router.post("/addEmployerDetails", (req, res) => {
    console.log(req.body.employerName)
        const employerId = req.body.employerId;
        const employerName = req.body.employerName;
        const roleInCompany = req.body.roleInCompany;
        const address = req.body.address;
        const city = req.body.city;
        const state = req.body.state;
        const country = req.body.country;
        const zipcode = req.body.zipcode;
        // console.log(address);
        
        let sql1 = "UPDATE Employer SET name = " +mysql.escape(employerName)
        +" ,roleInCompany =  "+mysql.escape(roleInCompany)
        +",address = "+mysql.escape(address)
        +",state = "+mysql.escape(state)
        +",country = "+mysql.escape(country)+
        ",city = "+mysql.escape(city)+
        ",zipcode = "+mysql.escape(zipcode)+
        " WHERE id = "+mysql.escape(employerId);
        //console.log(sql1);
        let query = connection.query(sql1, (error, result) => {
            if (error) {
                // res.writeHead(500,{
                //     'Content-Type' : 'application/json'
                // });
                //console.log(error.message);
                res.status(500).end("Server Error. Please Try Again! ");
            } else {
                // res.writeHead(200,{
                //     'Content-Type' : 'application/json'
                // });
                res.status(200).end("Employer Details Added!");
            }            
        });
    });
    module.exports = router;