"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Service = require('../models/Service');
const MyServices = require('../models/MyServices');

router.get("/api/savedServices/:userId", (req, res) => {
    const userId = req.params.userId;
    MyServices.find({userId:userId,status:'saved'}).select('serviceId -_id').then(result=> {
        let serv = result.map(async(sId) => {
            let services = await Service.find({_id:sId}).then(service=> {
                return service;
            })
            return services;
        })
        res.status(200).send(serv);
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Failed to fetch saved services.');
    })
    
});
router.get("/api/appliedServices/:userId", (req, res) => {
    const userId = req.params.userId;
    MyServices.find({userId:userId,status:'applied'}).select('serviceId -_id').then(result=> {
        let serv = result.map(async(sId) => {
            let services = await Service.find({_id:sId}).then(service=> {
                return service;
            })
            return services;
        })
        res.status(200).send(serv);
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Failed to fetch saved services.');
    })
    
});

router.post("/api/saveService", (req, res) => {
    console.log('I am at saveservice api')
    const userId = req.body.userId;
    const serviceId = req.body.serviceId;
    const key = {
        status:'saved',
        serviceId: serviceId
    }
    MyServices.update({userId:userId,key,status:'saved'},{upsert:true}).select('serviceId -_id').then(result=> {
        console.log('result for savedSer',result)
        res.status(200).send('Success');
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Could not save the service.');
    })
    
});

module.exports = router;
