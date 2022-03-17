const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Photo = mongoose.model('Photo')
//const { checkAuth } = require("../config/passport");

router.get("/api/getJobSeekerPhotos/", async (req, res) => {
  const query = JSON.parse(req.query.data)
    const jobSeekerId = query.jobSeekerId;
    const photoAdminReviewedStatus = query.photoAdminReviewedStatus;
    const companyId = query.companyId
    console.log(query)
    try {
      Photo.find({jobSeekerId:jobSeekerId, companyId:companyId,photoAdminReviewedStatus:photoAdminReviewedStatus })
      .then(result =>{
        Photo.find({jobSeekerId:jobSeekerId, companyId:companyId,photoAdminReviewedStatus:photoAdminReviewedStatus }).count()
        .then(r1=>{
          console.log(result)
          return res.status(200).json({ photos: result, count:r1 });;
        })

      })
      .catch(err =>{
        console.log("Error occured while querying");
        return res.status(400).send("Error occurred while retrieving photo details of jobSeeker");
      })
    }
    catch{(err) => {
      return res.status(400).json({ error: err });
    }}
});

module.exports = router;