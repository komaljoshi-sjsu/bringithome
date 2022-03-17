"use strict";
const express = require("express");
const router = express.Router();
const conn = require("./../config/mysql_connection");
//const { checkAuth } = require("../config/passport");

router.get("/api/getAdminReviews", async (req, res) => {
  const params = JSON.parse(req.query.data)
  const postsPerPage = 5
  const currentPage = params.currentPage;
  const offset = 5*(currentPage-1)
  const condition = "PENDING_APPROVAL"
  const query = "SELECT r.*, c.companyName FROM Review r, Company c WHERE r.companyId = c.companyId and r.adminReviewStatus = ? order by r.postedDate LIMIT ?,?";
  const count = "SELECT COUNT(*) AS total FROM Review WHERE adminReviewStatus = ?";
  conn.query(query, [condition,offset,postsPerPage], function (err, rows) {
    if (err) {
      console.log("Error occured while querying"+err);
      return res.status(400).send("Error occurred while retrieving pending reviews");
    }
    else{
      conn.query(count, condition, function (err, rows2) {
        if (err) {
          console.log("Error occured while querying"+err);
          return res.status(400).send("Error occurred while retrieving pending reviews");
        }
        //console.log("server result" + rows);
        return res.status(200).json({ reviews: rows, count:rows2[0].total});
      })
    }
  });
});

router.post("/api/setReviewStatus", async (req, res) => {
  const {adminReviewStatus, reviewId} = req.body;
  const data = [adminReviewStatus, reviewId];
  console.log(req.body)
  const updateQuery = "update Review SET adminReviewStatus = ? WHERE reviewId = ?";
  conn.query(updateQuery, data, function (err, rows) {
    if (err) {
      console.log("Error occured while querying");
      return res.status(400).send("Error occurred while updating review status");
    }
    //console.log("server result" + rows);
    return res.status(200).json({ reviews: rows});
  });
    
});
  
module.exports = router;