//job seeker API for viewing company reviews
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
const mongoose = require("mongoose");
const Company = mongoose.model("Company");

const mysql = require('mysql');
const http = require('http');
const url = require('url');

router.get("/allReviews", (req, res) => {

    Company.find((error, data) => {
        if (error) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if(data.length > 0){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            console.log("Review data : ",JSON.stringify(data));
            res.end(JSON.stringify(data));
            
        }else{
            res.writeHead(400,{
                'Content-Type' : 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });	
});

router.post("/searchReview", (req, res) => {

    const companyName = req.body.companyName;
    const location = req.body.location;
    console.log(companyName);
    console.log(location);
    let companyIds = [];
    let sql ='';
    if(companyName !== '' && companyName !== undefined && location != '' && location !== undefined){
        sql = "SELECT companyId FROM Company WHERE companyName LIKE "+mysql.escape('%'+companyName+'%') +" and headquarters = "+mysql.escape(location) ;
    }else if(companyName !== '' && companyName !== undefined ){
        sql = "SELECT companyId FROM Company WHERE companyName LIKE "+mysql.escape('%'+companyName+'%');
    }else if(location != '' && location !== undefined){
        sql = "SELECT companyId FROM Company WHERE headquarters = "+mysql.escape(location);
    }
    console.log("sql :" +sql);
    connection.query(sql, (err, results) => {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if(results.length > 0){
            for(let i=0; i<results.length; i++){
                companyIds.push(results[i].companyId);
            }
            console.log("company Ids: "+companyIds);
        }
        Company.find({ companyId: { $in: companyIds }}, (error, data) => {
            if (error) {
                res.writeHead(401,{
                    'Content-Type' : 'application/json'
                });
                res.end("Server error. Please try again later!");
            }
            else if(data.length > 0){
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                });
                console.log("Review data : ",JSON.stringify(data));
                res.end(JSON.stringify(data));
                
            }else{
                res.writeHead(200,{
                    'Content-Type' : 'application/json'
                });
                console.log("No reviews available!");
                res.end("No reviews available!!");
            }
        });	
    });
});

router.post("/updateFeaturedReview", (req, res) => {
    
    let sql = 'UPDATE Review SET isFeatured = 1 WHERE reviewId = ?';
    let data = [req.body.reviewId];
    
    connection.query(sql, data, (err, results) => {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else{
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            res.end("Featured review updated successfully");
        }
    });
});

module.exports = router;