"use strict";

const express = require("express");
const router = express.Router();
const Freelancer = require('../models/Freelancer');
const { checkAuth } = require("../config/passport");

router.post("/api/editFreelancerDetails",checkAuth, (req, res) => {
    // console.log(req.body);
    const { 
        _id,
        name,
        address,
        city,
        state,
        zipcode,
        country
     } = req.body;

    const freelancerId =req.body._id;
    // console.log("ID",freelancerId);
    try {
    Freelancer.findByIdAndUpdate(freelancerId, {
        $set: {
            name: name,
            address: address,
            city: city,
            state: state,
            zipcode: zipcode,
            country: country
        },
    })
      .then((result) => {
        // console.log("Freelancer Details updated",[result])
        return res.status(200).json("Freelancer Details have been updated");	
      })
      .catch((err) => {
        console.log('Error occured while updating')
        return res
          .status(400)
          .send(err);
      })
  } catch {
    ;(err) => {
      return res.status(400).json({ error: err })
    }
  }
})

module.exports = router;