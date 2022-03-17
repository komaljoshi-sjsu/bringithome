const express = require("express");
const router = express.Router();
const conn = require("../config/mysql_connection");

router.get("/api/getAllReviewsByCompanyId", async (req, res) => {
  const params = JSON.parse(req.query.data)
  const postsPerPage = 5
  const currentPage = params.currentPage;
  const offset = 5*(currentPage-1)
  const companyId = params.companyId;
  const query = "SELECT * FROM Review r where r.companyId=? order by r.postedDate desc LIMIT ?, ?";
  const count = "SELECT COUNT(*) AS total FROM Review WHERE companyId=?";
  conn.query(query, [companyId, offset, postsPerPage] , function (err, rows) {
    if (err) {
      console.log("Error occured while querying");
      res.status(400).send("Error occurred while retrieving all the reviews");
    } else{
      conn.query(count, companyId, function (err, rows2) {
        if (err) {
          console.log("Error occured while querying"+err);
          return res.status(400).send("Error occurred while retrieving all the reviews");
        }
        //console.log("server result" + JSON.stringify(rows));
        //console.log("server count" + rows2[0].total);
        return res.status(200).json({ reviews: rows, count:rows2[0].total});
      })
    }
  });
});

module.exports = router;