"use strict";
const express = require("express");
const router = express.Router();
const conn = require("./../config/mysql_connection");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const JobSeeker = mongoose.model("JobSeeker");
const Company = mongoose.model("Company");

router.post("/api/signup", (req, res) => {
  try {
    const name = req.body.name
    const emailId = req.body.email;
    const pwd = req.body.password;
    const accountType = req.body.accountType;
    if ("JobSeeker" === accountType) {
      conn.query(
        "Select * from JobSeeker where email = ?",
        [emailId],
        async function (err, rows) {
          if (err) {
            res.status(400).send("Unknown error occured");
          }
          if (rows && rows.length) {
            console.log("already registered");
            res
              .status(400)
              .send("JobSeeker already registered with this emailId");
          } else {
            const salt = await bcrypt.genSalt(10);
            const hashPwd = await bcrypt.hash(pwd, salt);

            const insertQuery =
              "insert into JobSeeker (name, email, password, accountType) values (?, ?, ?, ?)";
            conn.query(
              insertQuery,
              [name, emailId, hashPwd, accountType],
              function (err, rows) {
                if (err) {
                  res.status(400).send("Unknown error occured");
                } else {
                  const selectQuery = "select * from JobSeeker where email=?";
                  conn.query(selectQuery, [emailId], function (err, rows) {
                    if (err) {
                      res.status(400).send("Unknown error occured");
                    } else {
                      res
                        .status(200)
                        .send(rows[0]);
                    }
                  })
                }
              });
          }
        });
    } else if ("Employer" === accountType) {
      conn.query(
        "Select * from Employer where email = ?",
        [emailId],
        async function (err, rows) {
          if (err) {
            res.status(400).send("Unknown error occured");
          }
          if (rows && rows.length) {
            console.log("already registered");
            res
              .status(400)
              .send("Employer already registered with this emailId");
          } else {
            const salt = await bcrypt.genSalt(10);
            const hashPwd = await bcrypt.hash(pwd, salt);
            const insertQuery =
              "insert into Employer (name, email, password, accountType) values (?, ?, ?, ?)";
            conn.query(
              insertQuery,
              [name, emailId, hashPwd, accountType],
              function (err, rows) {
                res
                  .status(200)
                  .send("Employer registered successfully" + rows);
              }
            );
          }
        }
      );
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while registering");
  }
});

router.post("/api/signupJobSeekerMongo", async (req, res) => {
  try {
    const { jobSeekerId, resumeUrl, jobPreference, savedJobs } = req.body;
    console.log(req.body);
    const jobSeekerDtls = new JobSeeker({
      jobSeekerId,
      resumeUrl,
      jobPreference,
      savedJobs
    });
    jobSeekerDtls
      .save()
      .then((result) => {
        console.log(jobSeekerDtls)
        return res.status(200).json({ jobSeekerDtls: result });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ error: "Error while inserting job seeker details in mongoDB" + err });
      });
  } catch (err) {
    return res.status(400).json({ error: "error" });
  }
});


router.post("/api/createCompanyMongo", async (req, res) => {
  console.log("create mong")
  console.log(req.body)
  try {
    const { compid } = req.body;
    const { companyname } = req.body;
    const companyDtls = new Company({
      companyId : compid,
      companyName:companyname,
      avgWorkHappinessScore: 0.00,
      avgLearningScore: 0.00,
      avgAppreciationScore: 0.00,
      noOfReviews: 0,
      companyAvgRating: 0.00,
      ceoAvgRating: 0.00

    });
    companyDtls
      .save()
      .then((result) => {
        console.log(companyDtls)
        return res.status(200).json({ companyDtls: result });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ error: "Error while inserting company details in mongoDB" + err });
      });
  } catch (err) {
    //console.log(err.message)
    return res.status(400).json({ error: "error" });
  }
});


module.exports = router;