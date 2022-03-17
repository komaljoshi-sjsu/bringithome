"use strict";
const express = require("express");
const router = express.Router();
const conn = require("./../config/mysql_connection");
const { auth } = require("../config/passport");
const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Company = require('../models/Company');
auth();

router.get("/api/snapshot/:companyId", (req, res) => {
    try {
        const cid = req.params.companyId;
        Company.find({companyId:cid}).then(result=> {
            console.log(result);
            let cmpny = result[0];
            const companyQuery = 'SELECT * FROM Company WHERE companyId=?';
            conn.query(companyQuery,[cid], (error,details)=> {
                console.log(details);
                if(error) {
                    return res.status(400).send('Failed to get company details');
                }
                else {
                    details = details[0];
                    details.whScore = cmpny.avgWorkHappinessScore;
                    details.lScore = cmpny.avgLearningScore;
                    details.apScore = cmpny.avgAppreciationScore;
                    details.noOfReviews = cmpny.noOfReviews;
                    return res.status(200).send(details);
                }
            })
        }).catch(err=> {
            return res.status(503).send('Failed to get company details');
        })
        
    }
    catch (error) {
        console.log("ERROR!!!!!" +error);
        return res.status(400).send("Failed to get company detail");
    }
});

router.get("/api/featuredReviews/:companyId", (req, res) => {
    try {
        const cid = req.params.companyId;
        conn.query('SELECT reviewTitle, reviewerRole, city, state, postedDate, rating, reviewComments, pros, cons FROM Review WHERE companyId=? AND isFeatured=? ORDER BY rating',[cid,true],(err,reviews)=> {
            if(err) {
                console.log(err);
                return res.status(400).send('Failed to fetch featured reviews');
            } else {
                if(reviews.length<=5)
                    return res.status(200).send(reviews);
                else {
                    const highest = reviews.slice(0,4);
                    const lowest = reviews[reviews.length-1];
                    highest.push(lowest);
                    return res.status(200).send(highest);
                }
            }
        })
        
    }
    catch (error) {
        console.log("ERROR!!!!!" +error);
        return res.status(400).send("Failed to get featured reviews of the company");
    }
});

module.exports = router;
