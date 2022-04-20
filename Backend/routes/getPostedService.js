"use strict";

const express = require("express");
const router = express.Router();
const Freelancer = require('../models/Freelancer');
const Service =require('../models/Service');




router.post('/api/getPostedService',  (req, res) => {
  // console.log("Request",req.body)
  const freelancerId = req.body.employerId;
  // console.log(freelancerId);
  try {
    Service.find({"freelancer.freelancerId" :freelancerId}).then(result=>{
      // console.log('Service Record found',result);
        if(result.length>0) {
                return res.status(200).send(JSON.stringify(result));	
              }else {
                console.log('No service available');
              }
          });
  } catch (error) {
    console.log(error);
    return res.status(400).send("Error while fetching service");
}
});



// router.post('/api/getPostedService',  (req, res) => {
//   // console.log("Request",req.body)
//   const freelancerId = req.body.employerId;
//   try {
//     Freelancer.find({freelancerId:freelancerId}).then(result=>{
//       let allServices=[];
//         if(result.length>0) {
//           // console.log('Freelancer Record found',result[0].availableServices);
//           const serviceId=[];
//           result[0].availableServices.forEach(element => {
//            serviceId.push(element.serviceId);
//             // console.log(element);
//             // console.log("id",serviceId);
//           })
//           // console.log("id",serviceId);
//             Service.find({serviceId:serviceId}).then(serResult=>{
//               if(serResult.length>0) {
//                 console.log('Service Record found',serResult);
//                 allServices.push(serResult);
//                 return res.status(200).send(JSON.stringify(allServices[0]));	
//               }else {
//                 console.log('No service available');
//               }
//           });
//         // console.log('Service Record found',allServices[0])
//         // return res.status(200).send(JSON.stringify(allServices[0]));	
//     } else {
//         console.log('No record found');
//       }
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send("Error while fetching service");
// }
// });

module.exports = router
  