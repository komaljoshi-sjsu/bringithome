"use strict";
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");

router.post("/api/updateJobSeekerProfile", (req, res) => {
  const cid = req.body.id;
  const data = req.body.data;
  Customer.findOneAndUpdate({ _id: cid }, data, { new: true })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not update profile.");
    });
});
module.exports = router;
