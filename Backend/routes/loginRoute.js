"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Customer = require('../models/Customer');
const Freelancer = require('../models/Freelancer');

router.post("/api/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const accountType = req.body.accountType;
    if ("Customer" === accountType) {
        try {
            Customer.find({email:email}).then(async(result)=>{
                if(result.length==1) {
                    const isCorrect = await bcrypt.compare(password,result[0].password);
                    if(!isCorrect) {
                        res.status(400).send("Password incorrect");
                    } else {
                        res.status(200).send(result[0]._id);
                    }
                } else {
                    res.status(400).send("Username incorrect");
                }
            }).catch(err=> {
                let error ="Some error occurred while signing in. Please contact admin.";
                console.log(error,err);
                res.status(400).send(error);
            });
        } catch (err) {
            console.log('exception!!',err);
            res.status(400).send('Error at login. Please refer console.');
        }
    } else if ("Freelancer" === accountType) {
        try {
            Freelancer.find({email:email}).then(async(result)=>{
                if(result.length==1) {
                    const isCorrect = await bcrypt.compare(password,result[0].password);
                    if(!isCorrect) {
                        res.status(400).send("Password incorrect");
                    } else {
                        res.status(200).send(result[0]._id);
                    }
                } else {
                    res.status(400).send("Username incorrect");
                }
            }).catch(err=> {
                let error ="Some error occurred while signing in. Please contact admin.";
                console.log(error,err);
                res.status(400).send(error);
            });
        } catch (err) {
            console.log('exception!!',err);
            res.status(400).send('Error at login. Please refer console.');
        }
    }
});

module.exports = router;
