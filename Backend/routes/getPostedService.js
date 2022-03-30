"use strict";

const express = require("express");
const router = express.Router();
const Freelancer = require('../models/Freelancer');
const Service =require('../models/Service');

router.get('/api/getAdminPhotos/', async (req, res) => {
    const query = JSON.parse(req.query.data)
    // const photoAdminReviewedStatus = query.photoAdminReviewedStatus
    const companyName = query.companyName
    const postsPerPage = 5
    const currentPage = query.currentPage
    try {
      Service.find({ companyName: companyName })
        .limit(postsPerPage)
        .skip(postsPerPage * (currentPage - 1))
        .then((result) => {
          Service.find({ companyName: companyName })
            .count()
            .then((r1) => {
              //console.log(result)
              return res.status(200).json({ service: result, count: r1 })
            })
        })
        .catch((err) => {
          console.log('Error occured while querying')
          return res
            .status(400)
            .send('Error occurred while retrieving all photos')
        })
    } catch {
      ;(err) => {
        return res.status(400).json({ error: err })
      }
    }
  })
  
  module.exports = router
  