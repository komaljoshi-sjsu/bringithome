"use strict";
const express = require("express");
const router = express.Router();
const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}
router.post("/api/updateJobSeekerProfile", async (req, res) => {
  const cid = req.body.id;
  const data = req.body.data;
  const encryptedPwd = await hashPassword(data.password);
  data.password = encryptedPwd;
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
