//job seeker API for viewing company reviews
const express = require("express");
const router = express.Router();
const connection = require("../config/mysql_connection");
const mongoose = require("mongoose");
const Company = mongoose.model("Company");

const mysql = require('mysql');
const http = require('http');
const url = require('url');

router.get("/companyReviewsPaginated", (req, res) => {

    const queryObject = url.parse(req.url,true).query;
    const adminReviewStatus = 'APPROVED';
    const pageNumber = queryObject.currentPage;
    const limit = 5;
    const offset = (pageNumber - 1) * limit;
    console.log("pageNumber" +pageNumber);
    console.log("offset" +offset);
	let sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.isFeatured=1 and r.adminReviewStatus=? ORDER BY FIELD(jobSeekerId, ?) DESC LIMIT ?,?' ;
    console.log(sql);
    connection.query(sql, [adminReviewStatus, queryObject.jobSeekerId, offset, limit], (err, results) => {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if(results.length > 0){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            
            console.log("Review data : ",JSON.stringify(results));
            res.end(JSON.stringify(results));
            
        }else{
            res.writeHead(400,{
                'Content-Type' : 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });	
});

router.get("/companyReviewsRatingSort", (req, res) => {

    console.log("Inside sort");
    const queryObject = url.parse(req.url,true).query;
    const adminReviewStatus = 'APPROVED';
    const pageNumber = queryObject.currentPage;
    const limit = 5;
    const offset = (pageNumber - 1) * limit;
    console.log("pageNumber" +pageNumber);
    console.log("offset" +offset);
	let sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.isFeatured=1 and r.adminReviewStatus=? ORDER BY rating DESC LIMIT ?,?' ;
    console.log(sql);
    connection.query(sql, [adminReviewStatus, offset, limit], (err, results) => {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if(results.length > 0){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            
            console.log("Review data : ",JSON.stringify(results));
            res.end(JSON.stringify(results));
            
        }else{
            res.writeHead(400,{
                'Content-Type' : 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });	
});

router.get("/companyReviewsDateSort", (req, res) => {

    console.log("Inside sort");
    const queryObject = url.parse(req.url,true).query;
    const adminReviewStatus = 'APPROVED';
    const pageNumber = queryObject.currentPage;
    const limit = 5;
    const offset = (pageNumber - 1) * limit;
    console.log("pageNumber" +pageNumber);
    console.log("offset" +offset);
	let sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.isFeatured=1 and r.adminReviewStatus=? ORDER BY postedDate DESC LIMIT ?,?' ;
    console.log(sql);
    connection.query(sql, [adminReviewStatus, offset, limit], (err, results) => {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if(results.length > 0){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            
            console.log("Review data : ",JSON.stringify(results));
            res.end(JSON.stringify(results));
            
        }else{
            res.writeHead(400,{
                'Content-Type' : 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });	
});

router.get("/companyReviewsHelpfulSort", (req, res) => {

    console.log("Inside sort");
    const queryObject = url.parse(req.url,true).query;
    const adminReviewStatus = 'APPROVED';
    const pageNumber = queryObject.currentPage;
    const limit = 5;
    const offset = (pageNumber - 1) * limit;
    console.log("pageNumber" +pageNumber);
    console.log("offset" +offset);
	let sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.isFeatured=1 and r.adminReviewStatus=? ORDER BY yesReviewHelpfulCount DESC LIMIT ?,?' ;
    console.log(sql);
    connection.query(sql, [adminReviewStatus, offset, limit], (err, results) => {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if(results.length > 0){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            
            console.log("Review data : ",JSON.stringify(results));
            res.end(JSON.stringify(results));
            
        }else{
            res.writeHead(400,{
                'Content-Type' : 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });	
});

router.get("/companyReviews", (req, res) => {

    const queryObject = url.parse(req.url,true).query;
    const adminReviewStatus = 'APPROVED';
	let sql = 'SELECT r.*, c.companyName FROM Review r, Company c where r.companyId='+mysql.escape(queryObject.companyId)+ ' and r.companyId = c.companyId and r.isFeatured=1 and r.adminReviewStatus=?' ;
    console.log(sql);
    connection.query(sql, [adminReviewStatus], (err, results) => {
        if (err) {
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else if(results.length > 0){
            res.writeHead(200,{
                'Content-Type' : 'application/json'
            });
            
            console.log("Review data : ",JSON.stringify(results));
            res.end(JSON.stringify(results));
            
        }else{
            res.writeHead(400,{
                'Content-Type' : 'application/json'
            });
            console.log("No reviews available!");
            res.end("No reviews available!!");
        }
    });	
});

router.post("/updateHelpfulCount", (req, res) => {

    console.log(req.body.yesReviewHelpfulCount);
    let sql = 'UPDATE Review SET yesReviewHelpfulCount = ?, noHelpfulCount = ? WHERE reviewId = ?';
    let data = [req.body.yesReviewHelpfulCount, req.body.noHelpfulCount, req.body.reviewId];
    
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
            res.end("Helpful count updated successfully");
        }
    });
});

router.post("/saveReview", (req, res) => {

    console.log(req.body);
    let sql = 'INSERT INTO Review(reviewTitle, reviewerRole, city, state, postedDate, rating, workHappinessScore, learningScore, appraisalScore, reviewComments, pros, cons, ceoApprovalRating, howToPrepare, noHelpfulCount, yesReviewHelpfulCount, isFeatured, adminReviewStatus, jobSeekerId, companyId ) VALUES (?,?,?,?,now(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) ';
    let data = [req.body.reviewTitle, req.body.reviewerRole, req.body.city, req.body.state, req.body.rating, req.body.workHappinessScore, req.body.learningScore, req.body.appreciationScore, req.body.reviewComments, req.body.pros, req.body.cons, req.body.ceoApprovalRating, req.body.howToPrepare, 0, 0, 0,'PENDING_APPROVAL', req.body.jobSeekerId, req.body.companyId];
    
    connection.query(sql, data, (err, results) => {
        if (err) {
            console.log(err);
            res.writeHead(401,{
                'Content-Type' : 'application/json'
            });
            res.end("Server error. Please try again later!");
        }
        else{
            let sql = 'select round(avg(Rating),1) as avgRating, round(avg(workHappinessScore),1) as avgWHScore, round(avg(learningScore),1) as avgLScore, round(avg(appraisalScore),1) as avgAppScore, round(avg(ceoApprovalRating),1) as avgCeoScore, count(Rating) as totalReviews from Review where companyId=?';
            connection.query(sql, [req.body.companyId], (err, results) => {
                if (err) {
                    console.log(err);
                }
                else if(results.length > 0){
                    console.log('update');
                    console.log(results[0].avgWHScore);
                    Company.updateOne({
                        companyId: req.body.companyId
                    }, {
                        $set: {
                            avgWorkHappinessScore: results[0].avgWHScore,
                            avgLearningScore: results[0].avgLScore,
                            avgAppreciationScore: results[0].avgAppScore,
                            noOfReviews: results[0].totalReviews,
                            companyAvgRating: results[0].avgRating,
                            ceoAvgRating: results[0].avgCeoScore
                        },
                    },{ upsert: true }, (error, data) => {
                
                        if (error) {
                            console.log(error);
                        }else{
                            console.log('true');
                        }
                    });
                }else{
                    console.log("no data");
                }
                console.log('Mongo DB success');
                res.writeHead(200,{
                      'Content-Type' : 'application/json'
                });
                res.end("Review saved successfully");
                });       
            }         
    });
});

module.exports = router;