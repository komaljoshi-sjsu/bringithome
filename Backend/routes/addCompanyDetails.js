//edit employer profile
const express = require("express");
const router = express.Router();
var mysql = require("mysql");
const connection = require("../config/mysql_connection");

router.post("/addCompanyDetails", (req, res) => {
    console.log("************")
    console.log(req.body)
    console.log("************")
    let addCompany_sql = 'INSERT INTO Company(companyName, website, companySize, about, ceo, companyValues, workCulture, founded, revenue, mission, headquarters,industry,companyDescription,companyType) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
    let compDetails = [req.body.companyName, req.body.website, req.body.companySize, req.body.about, req.body.ceo, req.body.companyValues, req.body.workCulture, req.body.founded, req.body.revenue, req.body.mission, req.body.headquarters,req.body.industry,
		req.body.companyDescription, req.body.companyType];

	connection.query(addCompany_sql, compDetails, (error, result) => {
				if (error) {
					res.writeHead(500,{
						'Content-Type' : 'application/json'
					});
					console.log(error.message);
					res.end("Server Error. Please Try Again! ");
				} else {
					res.writeHead(200,{
						'Content-Type' : 'application/json'
					});
					console.log("Company Added ")
                    const companyId = result.insertId;
                    
                    // res.send(200).json({companyId:companyId})
					//res.end("Company Added  successfully!");
                    let sql_companyid = "SELECT companyId,companyName FROM Company WHERE companyId = "+mysql.escape(companyId) ;
                    let query1 = connection.query(sql_companyid, (error, result_id) => {
                    
                        if (error) {
                                    res.send({ error: error });
                            }
                        if(result_id){
                            res.status(200).end(JSON.stringify(result_id))
                            // res.end(JSON.stringify(result));
                        }
                    })
                    let sql1 = "UPDATE Employer SET companyId = " +mysql.escape(companyId)+
                    " WHERE id = "+mysql.escape(req.body.employerId);

                    let query = connection.query(sql1, (error, result) => {
                        if (error) {
                            // res.writeHead(500,{
                            //     'Content-Type' : 'application/json'
                            // });
                            //console.log(error.message);
                            res.end("Server Error. Please Try Again! ");
                        } else {
                            // res.writeHead(200,{
                            //     'Content-Type' : 'application/json'
                            // });
                            ///res.send(200).json({companyId:companyId})
                            res.end("Company ID updated!");
                        }            
                    });

				}
                
	});
	
    });
    module.exports = router;