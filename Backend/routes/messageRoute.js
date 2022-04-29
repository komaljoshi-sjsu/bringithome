const express = require("express");
const router = express.Router();
const Message = require('../models/Message');
const Customer = require('../models/Customer');

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
      console.log("getMessage",req.params.conversationId);
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      res.status(200).json(messages);
    } catch (err) {
        res.status(500).send("Error occurred while retrieving message by conversation id");
    }
});

// router.get("/api/getAllJobSeekers", async (req, res) => {
//   const query = "select name as label, id as value from JobSeeker";
//   conn.query(query, async function (err, rows) {
//     if (err) {
//       console.log("Error occurred while retreiving job seekers");
//       res
//         .status(400)
//         .send("Error occurred while retreiving job seekers");
//     }
//     console.log("Query executed: ", rows);
//     res.status(200).send(rows);
//   });
// });

router.get("/api/getAllJobSeekers", async (req, res) => {
  try {
    let final=[];
    Customer.find({}).then((result)=>{
      result.forEach(element=>{
      final.push({label:element.name,value:element._id});
      })
      // console.log("customer",final);
      res.status(200).json(final);
    });
  } catch (err) {
      res.status(500).send("Error occurred while retreiving customers");
  }
});

module.exports = router;