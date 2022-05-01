"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Service = require('../models/Service');
const MyServices = require('../models/MyServices');

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

router.get("/api/savedServices/:userid", (req, res) => {
    const userId = req.params.userid;
    MyServices.find({userid:userId, status:'saved'}).then(async(result)=> {
        
        let serviceArr = [];
        for(let i = 0;i<result.length;i++) {
            let serv = result[i];
            await Service.find({_id:serv.serviceid}).then(service => {
                serviceArr.push(service[0]);
            })
        }
        console.log('result for saved services',serviceArr)
        res.status(200).send(serviceArr);
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Could not get saved services.');
    })
    
});

router.post("/api/saveService", (req, res) => {
    console.log('I am at saveservice api')
    const userId = req.body.userId;
    const serviceId = req.body.serviceId;
    MyServices.findOneAndUpdate({serviceid:serviceId,userid:userId},{serviceid:serviceId,userid:userId, status:'saved'},{upsert:true}).then(result=> {
        console.log('result for saved service',result)
        res.status(200).send('Success');
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Could not save the service.');
    })
    
});

router.post("/api/unSaveService", (req, res) => {
    const userId = req.body.userid;
    const serviceId = req.body.serviceid;
    MyServices.findOneAndRemove({serviceid:serviceId,userid:userId,status:'saved'}).then(result=> {
        console.log('result for deleted service',result)
        res.status(200).send('Success');
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Could not un save the service.');
    })
    
});

router.get("/api/getBookedSlots/:serviceId/:userId", (req, res) => {
    const userId = req.params.userId;
    const serviceId = req.params.serviceId;
    console.log(`service id is ${serviceId} and user id is ${userId}`)
    MyServices.find({$and:[{serviceid:serviceId},{userid:userId}], $or:[{status:'booked'},{status:'pending'}]}).select('date time -_id').then(result=> {
        const dateArr = result.map(ele=> {
            let modifiedDate = (ele.date).replace(/[/]/g,'-');
            return modifiedDate;
        })
        const timeArr = result.map(ele=> {
            let tim = ele.time.split(':');
            let hour = parseInt(tim[0]);
            let min = parseInt(tim[1]);

            return [hour, min];
        })
        const dateTimeArr = result.map(ele=> {
            let modifiedDate = (ele.date).replace(/[/]/g,'-');
            let date = new Date(modifiedDate);
            
            let tim = ele.time.split(':');
            let hour = parseInt(tim[0]);
            let min = parseInt(tim[1]);
            date.setHours(hour,min);
            console.log(`hour ${hour} min ${min}`);
            console.log(date);
            return date;
        })
        const json = {
            date: dateArr,
            time: timeArr,
            dateTimeArr: dateTimeArr
        }
        console.log(json);
        res.status(200).send(json);
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Could not save the service.');
    })
    
});
router.post("/api/bookService", (req, res) => {
    const userId = req.body.userid;
    const serviceId = req.body.serviceid;
    const address = req.body.address;
    const phone = req.body.phone;
    const dateSlot = req.body.date;
    const timeSlot = req.body.time;
    MyServices.findOneAndUpdate({serviceid:serviceId,userid:userId,date:dateSlot,time:timeSlot},{serviceid:serviceId,userid:userId,date:dateSlot,time:timeSlot, address: address, phone: phone, status:'pending'},{upsert:true}).then(result=> {
        console.log('result for booked service',result)
        res.status(200).send('Success');
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Could not book the service.');
    })
    
});

module.exports = router;
