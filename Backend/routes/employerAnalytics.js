'use strict'
const express = require('express')
const router = express.Router()
const conn = require('../config/mysql_connection')

router.get('/jobPosted', (req, res) => {
  try {
    let employerId=req.query.employerId;
    console.log("BE employer id: ", employerId);
    // add [id] to get data for particular employer
    conn.query('SELECT count(Job.jobId) as countJobId ,Job.jobTitle from Job,Employer where Employer.id=Job.id  and Job.id =? and YEAR(Job.jobPostedDate) <=YEAR(CURDATE()) and YEAR(Job.jobPostedDate) >= YEAR(CURDATE())-1 group by Job.jobTitle limit 10;',[employerId], async function (err, results) {
      if (results.length <= 0) {
        console.log('Chart 1 data Not found')
        // res.status(400).send('Report details not found')
      }
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
      return res.send(results)
    })
  } catch (error) {
    console.log('ERROR!' + error)
    return res.status(400).send('Error while fetching details')
  }
})


router.get('/applicantsDetail', (req, res) => {
  try {
    let employerId=req.query.employerId;
    // add [id] for a employer
    conn.query('SELECT count(AppliedJobs.id) as countAppId,status,AppliedJobs.companyId,Company.companyName as companyName from AppliedJobs,Employer,Company where AppliedJobs.companyId=Employer.companyId and AppliedJobs.companyId=Company.companyId and Employer.id=? group by status, AppliedJobs.companyId;',[employerId], async function (err, results) {
      if (results.length <= 0) {
        console.log('Chart 2 data Not found')
        // res.status(400).send('Report details not found')
      }
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
      return res.send(results)
    })
  } catch (error) {
    console.log('ERROR!' + error)
    return res.status(400).send('Error while fetching details')
  }
})

module.exports = router