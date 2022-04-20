"use strict";

const express = require("express");
const router = express.Router();
const Freelancer = require('../models/Freelancer');

router.post('/api/getFreelancerDetails',  (req, res) => {
  // console.log(req.body)
  // const companyId = '6250af3cf71117d20cb7487b';
  const empid= req.body.empid;
  try {
    Freelancer.findById(empid).then(result=>{
            // console.log(result);
            return res.status(200).json([result]);	
        }).catch((err) => {
          console.log('Error occured while querying')
          return res
            .status(400)
            .send('Error occurred while retrieving details')
        })
    } catch {
      ;(err) => {
        return res.status(400).json({ error: err })
      }
    }
  })

module.exports = router
  