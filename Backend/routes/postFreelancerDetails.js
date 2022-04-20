"use strict";

const express = require("express");
const router = express.Router();
const Freelancer = require('../models/Freelancer');

router.post("/api/postEmployerDetails", (req, res) => {
    // const companyName = req.body.companyName;
    console.log(req.body);
    const { 
        _id,
        name,
        address,
        city,
        state,
        zipcode,
        country
     } = req.body;

    try {
    Freelancer.findByIdAndUpdate(_id, {
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
        // console.log("Freelancer Details",result)
        return res.status(200).json({ result })
      })
      .catch((err) => {
        console.log('Error occured while querying')
        return res
          .status(400)
          .send('Error occurred while retrieving')
      })
  } catch {
    ;(err) => {
      return res.status(400).json({ error: err })
    }
  }
})

module.exports = router;