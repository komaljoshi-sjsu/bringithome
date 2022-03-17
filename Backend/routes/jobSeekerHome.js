'use strict'
const express = require('express')
const router = express.Router()
const conn = require('./../config/mysql_connection')
const mongoose = require('mongoose')
const { json } = require('body-parser')
const Company = mongoose.model('Company')
const JobSeeker = mongoose.model('JobSeeker')

router.get('/jobSeeker/home', (req, res) => {
  conn.query('select * from Job;', async function (err, results) {
    if (results && results.length <= 0) {
      console.log('Not found')
      res.status(400).send('Job details not found')
    }
    if (err) {
      console.log('error')
      res.status(400).send('Error ocurred')
    }
    return res.send(results)
  })
})

router.post('/jobSeeker/paginatedData', (req, res) => {
  //console.log(JSON.stringify(req.body))
  const postsPerPage = 5
  const currentPage = req.body.currentPage
  conn.query(
    'select * from Job limit ?,?',
    [(currentPage - 1) * postsPerPage, postsPerPage],
    async function (err, results) {
      if (results && results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Job details not found')
      }
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
      return res.send(results)
    },
  )
})

router.post('/jobSeeker/filterOnJobTitleOrCompanyName', (req, res) => {
  console.log(JSON.stringify(req.body))
  const companyName = req.body.keyword
  const jobTitle = req.body.keyword
  const postsPerPage = 5
  const currentPage = req.body.currentPage
  conn.query(
    'select * from Job where jobTitle = ? or companyName = ? limit ?,?',
    [jobTitle, companyName, (currentPage - 1) * postsPerPage, postsPerPage],
    async function (err, results) {
      await conn.query(
        'select count(*) as count from Job where jobTitle = ? or companyName = ?',
        [jobTitle, companyName],
        (err2, count) => {
          if (count && count.length <= 0) {
            console.log('Not found')
            res.status(400).send('Job details not found')
          }
          if (err2) {
            console.log('error')
            res.status(400).send('Error ocurred')
          }
          //console.log(JSON.stringify(count), JSON.stringify(results))
          return res.status(200).json({ result: results, count: count })
        },
      )
      if (results && results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Job details not found')
      }
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
    },
  )
})

router.post('/jobSeeker/filterOnLocation', (req, res) => {
  console.log(JSON.stringify(req.body))
  const city = req.body.keyword
  const state = req.body.keyword
  const zip = req.body.keyword
  const postsPerPage = 5
  const currentPage = req.body.currentPage
  conn.query(
    'select * from Job where city = ? or state = ? or zip = ? limit ?,?',
    [city, state, zip, (currentPage - 1) * postsPerPage, postsPerPage],
    async function (err, results) {
      await conn.query(
        'select count(*) as count from Job where city = ? or state = ? or zip = ?',
        [city, state, zip],
        (err2, count) => {
          if (count && count.length <= 0) {
            console.log('Not found')
            return res.status(400).send('Job details not found')
          }
          if (err2) {
            console.log('error')
            res.status(400).send('Error ocurred')
          }
          //console.log(JSON.stringify(count), JSON.stringify(results))
          return res.status(200).json({ result: results, count: count })
        },
      )
      if (results && results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Job details not found')
      }
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
    },
  )
})

router.post('/jobSeeker/filterOnLocationAndTitle', (req, res) => {
  console.log(JSON.stringify(req.body))
  const city = req.body.wherekeyword
  const state = req.body.wherekeyword
  const zip = req.body.wherekeyword
  const companyName = req.body.whatkeyword
  const jobTitle = req.body.whatkeyword
  const postsPerPage = 5
  const currentPage = req.body.currentPage
  conn.query(
    'select * from Job where (city = ? or state = ? or zip = ?) and (jobTitle = ? or companyName = ?) limit ?,?',
    [
      city,
      state,
      zip,
      jobTitle,
      companyName,
      (currentPage - 1) * postsPerPage,
      postsPerPage,
    ],
    async function (err, results) {
      await conn.query(
        'select count(*) as count from Job where (city = ? or state = ? or zip = ?) and (jobTitle = ? or companyName = ?)',
        [city, state, zip, jobTitle, companyName],
        (err2, count) => {
          if (count && count.length <= 0) {
            console.log('Not found')
            return res.status(400).send('Job details not found')
          } else if (err2) {
            console.log('error')
            return res.status(400).send('Error ocurred')
          }
          //console.log(JSON.stringify(count), JSON.stringify(results))
          else return res.status(200).json({ result: results, count: count })
        },
      )
      if (results && results.length <= 0) {
        console.log('Not found')
        return res.status(400).send('Job details not found')
      }
      if (err) {
        console.log('error')
        return res.status(400).send('Error ocurred')
      }
    },
  )
})

router.get('/jobSeeker/getCompanyReviews', (req, res) => {
  conn.query(
    "select count(reviewId) as NoOfReviews,companyId from Review where adminReviewStatus = 'APPROVED' group by companyId",
    async function (err, results) {
      if (results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Reviews not found')
      }
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
      return res.send(results)
    },
  )
})

router.get('/jobSeeker/getCompanyRating', (req, res) => {
  conn.query(
    'select CAST(avg(rating)AS DECIMAL(10,2)) as avgRating, companyId from Review',
    async function (err, results) {
      if (results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Rating not found')
      }
      if (err) {
        console.log('error')
        res.status(400).send('Error ocurred')
      }
      return res.send(results)
    },
  )
})

router.post('/jobSeeker/updateNoOfViews', (req, res) => {
  const { id } = req.body
  console.log(JSON.stringify(req.body))
  try {
    console.log('exec')
    Company.updateOne({ companyId: id }, { $inc: { noOfViews: 1 } })
      .then((result) => {
        console.log(result)
        return res.status(200).send(result)
      })
      .catch((err) => {
        console.log('Error occured while querying' + err)
        return res
          .status(400)
          .send('Error occurred while retrieving no of views')
      })
  } catch {
    ;(err) => {
      return res.status(400).json({ error: err })
    }
  }
})

router.post('/jobSeeker/saveJob', (req, res) => {
  let { companyId, userId } = req.body
  companyId = parseInt(companyId)
  console.log(JSON.stringify(req.body))
  try {
    console.log('exec')
    JobSeeker.updateOne(
      { jobSeekerId: userId },
      { $addToSet: { savedJobs: companyId } },
    )
      .then((result) => {
        console.log(result)
        return res.status(200).send(result)
      })
      .catch((err) => {
        console.log('Error occured while querying' + err)
        return res
          .status(400)
          .send('Error occurred while retrieving no of views')
      })
  } catch {
    ;(err) => {
      return res.status(400).json({ error: err })
    }
  }
})

router.post('/jobSeeker/applyJob', (req, res) => {
  let { appliedDate, jobId, id, companyId } = req.body
  console.log(req.body)
  conn.query(
    "insert into AppliedJobs (status, appliedDate, jobId, id, companyId) values ('Applied',?,?,?,?) ",
    [appliedDate, jobId, id, companyId],
    async function (err, results) {
      if (results && results.length <= 0) {
        console.log('Not found')
        res.status(400).send('Cannot insert job to applied table')
      }
      if (err) {
        console.log('error' + err)
        res.status(400).send('Error ocurred')
      }
      return res.send(results)
    },
  )
})

module.exports = router
