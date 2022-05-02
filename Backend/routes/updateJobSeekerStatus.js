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
    //     let sql1 = "UPDATE AppliedJobs SET  status= " +mysql.escape(status)
        
    //     +" WHERE id = "+mysql.escape(id)+" AND jobId = "+mysql.escape(jobId);
    //     console.log(sql1);
    //     let query = connection.query(sql1, (error, result) => {
    //         if (error) {
    //             res.writeHead(500,{
    //                 'Content-Type' : 'application/json'
    //             });
    //             //console.log(error.message);
    //             res.end("Server Error. Please Try Again! ");
    //         } else {
    //             res.writeHead(200,{
    //                 'Content-Type' : 'application/json'
    //             });
    //             console.log(result)
    //             res.status(200).end(" Job Seeker status updated");
    //         }            
    //     });
    // });
    module.exports = router;