'use strict'
const express = require('express')
const router = express.Router()
const Service =require('../models/Service');
const MyServices = require('../models/MyServices');
const Services = require('../models/Service');

router.get('/jobPosted', async (req, res) => {
  try {
    let employerId=req.query.employerId;
    let count =0;
    let final=[];
   await Service.aggregate([
     { $match: {  "freelancer.freelancerId":employerId} },
      { $group: {
            _id:  "$servicePostedMonth", 
            numberofbookings: {$sum: 1} ,
        }}
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
    let serArr=[];
  // Service.find({ "freelancer.freelancerId":employerId}).then(async (results)=>{
  //   results.forEach(element =>{
  //     serArr.push(element._id);
  // })
  // console.log(serArr);
  await MyServices.aggregate([
        // { $match: { serviceid : "$serArr" } },
        {$group: {
            _id: "$status", 
            count: {$sum: 1} ,
        }}
    ],
    function( err, data ) {
      if ( err )
        throw err;
    // console.log( JSON.stringify( data, undefined, 2 ) );
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