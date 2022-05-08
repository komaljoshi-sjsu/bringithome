'use strict'
const express = require('express')
const router = express.Router()
const Service =require('../models/Service');
const MyServices = require('../models/MyServices');
const Services = require('../models/Service');

router.get('/servicePosted', async (req, res) => {
  try {
    let employerId=req.query.employerId;
    let count =0;
    let final=[];
   await Service.aggregate([
     { $match: {  "freelancer.freelancerId":employerId} },
      { $group: {
            _id:  "$servicePostedMonth", 
            postedServices: {$sum: 1} ,
        }},
        { $sort : { borough : 1, _id: 1 } }
    ],
    function( err, data ) {
      if ( err )
        throw err;
      console.log( JSON.stringify( data, undefined, 2 ) );
    res.status(200).send(JSON.stringify( data, undefined, 2 ));
    }
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while fetching service");
}
});

router.get('/applicantsDetail', async (req, res) => {
    try {
    let employerId=req.query.employerId;
    var serArr=[];

    await MyServices.aggregate([
      {
        $lookup: {
            from: "Service",
            localField: "freelancer.freelancerId",
            foreignField: employerId,
            as: "id"
        }
      },
        { $match: {$or : [{status:"pending"} ,{status: "Booked"},{status:"Cancelled"}]} },
        {$group: {
            _id: "$status", 
            count: {$sum: 1} ,
        }}
    ],
    function( err, data ) {
      if ( err )
        throw err;
    console.log( "Customer booking Status", JSON.stringify( data, undefined, 2 ) );
    res.status(200).send(JSON.stringify( data, undefined, 2 ));
    }
    );
  // })
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while fetching service");
}
});
module.exports = router