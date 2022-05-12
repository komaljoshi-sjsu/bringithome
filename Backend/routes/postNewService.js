"use strict";

const express = require("express");
const router = express.Router();
const Freelancer = require('../models/Freelancer');
const Service =require('../models/Service');
const { checkAuth } = require("../config/passport");

router.post("/api/postNewService",checkAuth, (req, res) => {
    // const companyName = req.body.companyName;
    const { _id, 
        empid,
        companyName,
        jobTitle
     } = req.body;
     
    try {
      const service = new Service({
        freelancer: {
          freelancerId: req.body.empid,
          name: req.body.companyName,
        },
        serviceCategory: req.body.industry,
        serviceName: req.body.jobTitle,
        serviceMode: req.body.jobMode,
        serviceDescription: req.body.shortJobDescription,
        responsibilities: req.body.responsibilities,
        servicePostedDate :req.body.servicePostedDate,
        servicePostedMonth :req.body.servicePostedMonth,
        price:req.body.price,
        streetAddress: req.body.streetAddress,
        city: req.body.city,
        state:req.body.state,
        zipcode: req.body.zipcode,
        country: req.body.country,
        availability:{
            startDate: req.body.startDate,
            endDate:req.body.endDate,
            startTime:req.body.startTime,
            endTime:req.body.endTime,
            timeSlot:req.body.timeSlot
        },

        });
    // console.log(req.body);

    Service.find({  $and: [
      {serviceName: jobTitle},
      {freelancer: {name: companyName}
      }]
    }).then(result=>{
            if(result.length>0) {
                console.log('Service Record found');
            } else {
                console.log('New service record added');
                service.save().then(result=>{
                  //  console.log(result);
                  const cid = result._id;

                //Freelancer details update
                Freelancer.updateOne({_id:empid}, {
                    $push: {
                            availableServices:{
                                serviceId : cid,
                                serviceCategory: req.body.industry,
                            }
                        },
                      })
                        .then((result) => {
                        //   console.log("Freelancer record",result);
                          console.log("Freelancer new available service added");
                        //   return res.status(200).json({ photos: result });
                        })
                        .catch((err) => {
                          console.log('Error occured while querying');
                        //   return res.status(400).send('Error occurred while retrieving data')
                        });
                
                res.status(200).send('Success');
                }).catch(async (err)=>{
                    console.log('Error while posting a service', err);
                    res.status(400).send("Failed to post a service");
                }) 
            }
        });
      } catch (error) {
        console.log(error);
        return res.status(400).send("Error while posting service");
      }
    });
      
module.exports = router;