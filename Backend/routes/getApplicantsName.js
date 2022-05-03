//loading all the restaurants for the customer
const express = require("express");
const router = express.Router();
const MyServices = require('../models/MyServices');
const Customer = require('../models/Customer');
const Service = require('../models/Service');


router.post("/getApplicantsName", (req, res) => {
    const serviceId = req.body.serviceId;
    
    MyServices.find({serviceid:serviceId,status:'pending'}).then(async(result)=> {
        
        let applicantList = [];
        for(let i = 0;i<result.length;i++) {
            let serv = result[i];
            let custname;

           await Customer.find({_id:serv.userid}).then((cust)=>{
                custname = cust[0].name;
                serv = { serv, custname : custname}
            })

            await Service.find({_id:serv.serv.serviceid}).then(service => {
                let servc = service[0];
                let timeAr = serv.serv.time.split(':');
                let min = timeAr[1];
                if(timeAr[1].length == 1) {
                    min = '0'+timeAr[1];
                }
                let json = {
                    myServId : serv.serv._id,
                    serviceId: serv.serv.serviceid,
                    servicename : servc.serviceName,
                    user: serv.serv.userid,
                    name : serv.custname,
                    status: serv.serv.status,
                    // time: serv.serv.time,
                    time: timeAr[0]+':'+min,
                    date : serv.serv.date
                }
                applicantList.push(json);
            })
        }
        
        res.status(200).send(applicantList);
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Could not get customer details for the service.');
    })
    
});


module.exports = router;






