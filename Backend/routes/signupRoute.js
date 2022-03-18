"use strict";
const express = require("express");
const router = express.Router();
const Customer = require('../models/Customer');
const Freelancer = require('../models/Freelancer');

const bcrypt = require('bcrypt');

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash;
}

router.post("/api/signup", (req, res) => {
  try {
    const name = req.body.name
    const email = req.body.email;
    const pwd = req.body.password;
    const accountType = req.body.accountType;
    if ("Customer" === accountType) {
       //add customer
       Customer.find({email:email}).then(result=>{
          if(result.length>0) {
              res.status(400).send("This email already exists. Please specify different email");
          } else {
              registerCus(name,email,pwd,res);
          }
      });
    } else if ("Freelancer" === accountType) {
      //add customer
      Freelancer.find({email:email}).then(result=>{
          if(result.length>0) {
              res.status(400).send("This email already exists. Please specify different email");
          } else {
              registerFl(name,email,pwd,res);
          }
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while registering");
  }
});

const registerCus = async (name, email, pwd,res) => {
  const encryptedPwd = await hashPassword(pwd);
  const customer = new Customer({
      name: name,
      email: email,
      password: encryptedPwd,
      dp: ''
  });
  customer.save().then(result=>{
    console.log('i am at signup');
      const cid = result._id;
      res.status(200).send('Success');
  }).catch(async (err)=>{
    console.log('Error at customer registration', err);
    res.status(400).send("Failed to register customer");
  }) 
}

const registerFl = async (name, email, pwd, res) => {
  const encryptedPwd = await hashPassword(pwd);
  const freelancer = new Freelancer({
      name: name,
      email: email,
      password: encryptedPwd,
      dp: ''
  });
  freelancer.save().then(result=>{
      const cid = result._id;
      res.status(200).send('Success');
  }).catch(async (err)=>{
      console.log('Error at freelancer registration', err);
      res.status(400).send("Failed to register freelancer");
  }) 
}

module.exports = router;