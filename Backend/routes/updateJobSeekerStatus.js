//edit employer profile
const express = require("express");
const router = express.Router();
const MyServices = require('../models/MyServices');

router.post("/updateJobSeekerStatus", (req, res) => {
    try {
        console.log(req.body)
         const id = req.body.id;
         const status = req.body.status;
         MyServices.findByIdAndUpdate(id, {
            $set: {
                status: status
            },
        })
          .then((result) => {
            // console.log("Freelancer Details updated",[result])
            return res.status(200).json("Booking Details have been updated");	
          })
          .catch((err) => {
            console.log('Error occured while updating')
            return res
              .status(400)
              .send(err);
          })
    } catch {
      ;(err) => {
        return res.status(400).json({ error: err })
      }
    }
  })

    module.exports = router;