"use strict";

const express = require("express");
const router = express.Router();
const Freelancer = require('../models/Freelancer');
const Service =require('../models/Service');

router.post("/api/postNewService", (req, res) => {
    // const companyName = req.body.companyName;
    const { _id, 
        employeeId,
        companyName,
        streetAddress,
        city,
        state,
        zipcode,
        country
     } = req.body;
     
    try {
      const service = new Service({
        companyName: req.body.companyName,
        serviceCategory: req.body.industry,
        serviceName: req.body.jobTitle,
        serviceMode: req.body.jobMode,
        serviceDescription: req.body.shortJobDescription,
        description: req.body.responsibilities,
        availability:{
            startDate: req.body.startDate,
            endDate:req.body.endDate,
            startTime:req.body.startTime,
            endTime:req.body.endTime
        },
        minPrice:req.body.minPrice,
        maxPrice:req.body.maxPrice,
        });
    // console.log(req.body);

    Service.find({companyName:companyName}).then(result=>{
            if(result.length>0) {
                console.log('Service Record found');
            } else {
                console.log('New service record added');
                service.save().then(result=>{
                    const cid = result._id;

                //Freelancer details update
                Freelancer.updateOne({employeeId:employeeId}, {
                    $push: {
                            availableServices:{
                                serviceId : cid,
                                serviceCategory: req.body.industry,
                                address:{
                                    streetAddress: streetAddress,
                                    city: city,
                                    state: state,
                                    zipcode: zipcode,
                                    country: country
                                },
                            }
                        },
                      })
                        .then((result) => {
                        //   console.log("Freelancer record",result);
                          console.log("Freelancer address updated");
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