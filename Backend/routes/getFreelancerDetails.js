"use strict";

const express = require("express");
const router = express.Router();
const Freelancer = require('../models/Freelancer');

router.post('/api/getFreelancerDetails',  (req, res) => {
//   console.log(req.body)
  const companyId = req.body.companyId;
  try {
    Freelancer.find({companyId:companyId}).then(result=>{
        if(result.length>0) {
            console.log(result);
            return res.status(200).send(JSON.stringify(result));	
        }else {
            console.log('No record found');
          }
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while fetching service");
}
});

module.exports = router
  