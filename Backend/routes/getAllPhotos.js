const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Photo = mongoose.model('Photo')
//const { checkAuth } = require("../config/passport");

router.get("/api/getAllPhotos/", async (req, res) => {
  const query = JSON.parse(req.query.data)
  const photoAdminReviewedStatus = query.photoAdminReviewedStatus;
  const companyId = query.companyId
  const postsPerPage = 16
  const currentPage = query.currentPage;
  //console.log(query)
  try {
    Photo.find({companyId: companyId, photoAdminReviewedStatus:photoAdminReviewedStatus}).limit(postsPerPage).skip(postsPerPage*(currentPage-1))
    .then(result =>{
      Photo.find({companyId: companyId, photoAdminReviewedStatus:photoAdminReviewedStatus}).count()
      .then(r1=>{
        //console.log(result)
        return res.status(200).json({ photos: result,count:r1 });
      })

    })
    .catch(err => {
      console.log("Error occured while querying");
      return res.status(400).send("Error occurred while retrieving all photos");
    })
  }
  catch{(err) => {
    return res.status(400).json({ error: err });
  }}
});

module.exports = router;