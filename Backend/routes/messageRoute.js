const express = require("express");
const router = express.Router();
const Message = require('../models/Message');
const Customer = require('../models/Customer');
const MyServices = require('../models/MyServices');

router.post("/api/addNewMessage", async (req, res) => {

    const newMessage = new Message(req.body);
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (err) {
        res.status(500).send("Error occurred while adding new message");
    }
});

router.get("/api/getMessages/:conversationId", async (req, res) => {
    try {
      // console.log("getMessage",req.params.conversationId);
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
        res.status(500).send("Error occurred while retrieving message by conversation id");
    }
});

router.get("/api/getAllJobSeekers", async (req, res) => {
  try {
    MyServices.find({$or : [{status:"pending"} ,{status: "Booked"}]}).then(async (result)=>{
      let final=[];
      for(let i = 0;i<result.length;i++) {
        let serv = result[i];
        await Customer.find({_id:serv.userid}).then((cust)=>{
          let servc = cust[0];
          let json = {
            label: servc.name,
            value: servc._id
          }
          if(!JSON.stringify(final).includes(JSON.stringify(json))) {
            final.push(json); 
          }
        })
      }
      // console.log("customer",final);
      res.status(200).json(final);
    });
  } catch (err) {
      res.status(500).send("Error occurred while retreiving customers");
  }
});


module.exports = router;