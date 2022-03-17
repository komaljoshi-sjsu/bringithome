"use strict";
const express = require("express");
const router = express.Router();
const conn = require("./../config/mysql_connection");
const { auth } = require("../config/passport");
const { secret } = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JobSeeker = require('../models/JobSeeker');
auth();

const admin = {
    name: 'admin user',
    email: 'admin@indeed.com',
    password: 'admin',
    id: 'adminid_1'
}

router.post("/api/login", (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const accountType = req.body.accountType;
        if("Admin" === accountType) {
            console.log('Logging on admin');
            if(email!=admin.email) {
                console.log("No admin present with this email");
                return res.status(403).send("No admin present with this email");
            } else if( password!=admin.password) {
                console.log("Your password is incorrect");
                return res.status(403).send("Your password is incorrect");
            } else {
                let payload = { id: admin.id, accountType: 'Admin', user: {email:email, name: admin.name, id: admin.id} };
                const token = jwt.sign(payload, secret, {
                    expiresIn: 1008000,
                });
                console.log("JWT " + token);
                return res.status(200).json("JWT " + token);
            }
        }
        else if ("JobSeeker" === accountType) {
            conn.query(
                "select * from JobSeeker where email = ?",
                [email],
                async function (err, results) {
                    if (err) {
                        console.log("error");
                        res.status(400).send("Error ocurred");
                    }
                    if (results.length <= 0) {
                        console.log("Not found");
                        res.status(400).send("JobSeeker not registered");
                    }
                    console.log(results[0])
                    const compRes = await bcrypt.compare(password, results[0].password);
                    let payload = { id: results[0].id, accountType: results[0].accountType, user: results[0] };
                    if (compRes) {
                        JobSeeker.find({jobSeekerId:payload.id},'resumeUrl').then(resume => {
                            console.log('resume:',resume);
                            resume  = resume[0];
                            if(resume!=null)
                            payload.resumeUrl=resume.resumeUrl;
                            const token = jwt.sign(payload, secret, {
                                expiresIn: 1008000,
                            });
                            console.log("JWT " + token);
                            res.status(200).json("JWT " + token);
                        })
                        
                    } else {
                        console.log("incorrect");
                        res.status(400).send("Password incorrect");
                    }
                }
            );
        } else if ("Employer" === accountType) {
            conn.query(
                "select * from Employer where email = ?",
                [email],
                async function (err, results) {
                    if (err) {
                        res.status(400).send("Error ocurred");
                    }
                    if (results.length <= 0) {
                        res.status(400).send("Employer not registered");
                    }
                    const compRes = await bcrypt.compare(password, results[0].password);
                    const payload = { id: results[0].id, accountType: results[0].accountType, user: results[0] };
                    if (compRes) {
                        const token = jwt.sign(payload, secret, {
                            expiresIn: 1008000,
                        });
                        console.log("JWT " + token);
                        res.status(200).json("JWT " + token);
                    } else {
                        console.log("incorrect");
                        res.status(400).send("Password incorrect");
                    }
                }
            );
        }
    }
    catch (error) {
        console.log("ERROR!!!!!" +error);
        return res.status(400).send("Error while login");
    }
});

module.exports = router;
