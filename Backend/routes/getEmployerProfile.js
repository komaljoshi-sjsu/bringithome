//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
var mysql = require("mysql");
router.post('/getEmployerProfile', function(req,res){
    const employerid = req.body.empid;   
    console.log("****")
    console.log(employerid)
	let sql1 = "SELECT * FROM Employer e JOIN Company c ON e.companyId=c.companyId WHERE id = "+mysql.escape(employerid) ;
    let query = connection.query(sql1, (error, result) => {

    if (error) {
        
        res.status(400).send("Server Error. Please Try Again! ");
        }
    //  if(result.length == 0){
        
    //     res.send({ message: "No Profile Exists" })
    //      }   
        else{
        
            res.status(200).send(JSON.stringify(result));	
        }
		//console.log(JSON.stringify(result));	
		
	});
   
    
});
module.exports = router;






