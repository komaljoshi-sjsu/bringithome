"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Services = require("../models/Service");
const MyServices = require("../models/MyServices");

router.get("/api/completedservices/:userid", (req, res) => {
  const userId = req.params.userid;
  MyServices.find({
    $and: [{ userid: userId }],
    $or: [{ status: "Booked" }, { status: "Cancelled" }],
  })
    .then(async (result) => {
      let serviceArr = [];
      console.log("applied serv;", result);
      for (let i = 0; i < result.length; i++) {
        let serv = result[i];
        await Services.find({ _id: serv.serviceid }).then((service) => {
          let servc = service[0];

          let timeAr = serv.time.split(":");
          let min = timeAr[1];
          if (timeAr[1].length == 1) {
            min = "0" + timeAr[1];
          }
          let json = {
            _id: serv.serviceid,
            serviceName: servc.serviceName,
            serviceMode: servc.serviceMode,
            freelancer: servc.freelancer,
            date: serv.date,
            price: servc.price,
            time: timeAr[0] + ":" + min,
            bookingid: serv._id,
            status: serv.status
          };
          console.log("result for applied services", json);
          serviceArr.push(json);
        });
      }

      res.status(200).send(serviceArr);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not get saved services.");
    });
});

router.get("/api/appliedServices/:userid", (req, res) => {
  const userId = req.params.userid;
  MyServices.find({ userid: userId, status: "pending" })
    .then(async (result) => {
      let serviceArr = [];
      console.log("spplaied serv;", result);
      for (let i = 0; i < result.length; i++) {
        let serv = result[i];
        await Services.find({ _id: serv.serviceid }).then((service) => {
          let servc = service[0];

          let timeAr = serv.time.split(":");
          let min = timeAr[1];
          if (timeAr[1].length == 1) {
            min = "0" + timeAr[1];
          }
          let json = {
            _id: servc._id,
            serviceName: servc.serviceName,
            serviceMode: servc.serviceMode,
            freelancer: servc.freelancer,
            date: serv.date,
            price: servc.price,
            time: timeAr[0] + ":" + min,
            bookingid: serv._id,
          };
          console.log("result for applied services", json);
          serviceArr.push(json);
        });
      }

      res.status(200).send(serviceArr);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not get saved services.");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not get saved services.");
    });
});
router.post("/api/cancelService", (req, res) => {
  const userId = req.body.userid;
  const serviceId = req.body.serviceid;
  console.log(`Request canceling userid ${userId} serviceid ${serviceId}`);
  MyServices.findOneAndUpdate(
    { serviceid: serviceId, userid: userId, status: "pending" },
    { status: "Cancelled" }
  )
    .then((result) => {
      console.log("result for cancelled service", result);
      res.status(200).send("Success");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not cancel the service.");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not un save the service.");
    });
});

router.post("/api/findServices", (req, res) => {
  const where = req.body.where;
  const what = req.body.what;
  Services.find({ serviceName: what, city: where })
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/api/savedServices/:userid", (req, res) => {
  const userId = req.params.userid;
  MyServices.find({ userid: userId, status: "saved" })
    .then(async (result) => {
      let serviceArr = [];
      for (let i = 0; i < result.length; i++) {
        let serv = result[i];
        await Services.find({ _id: serv.serviceid }).then((service) => {
          serviceArr.push(service[0]);
        });
      }
      console.log("result for saved services", serviceArr);
      res.status(200).send(serviceArr);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not get saved services.");
    });
});
router.get("/api/allServices/:userid", (req, res) => {
  const userId = req.params.userid;

  MyServices.find({
    userid: userId,
    $or: [{ status: "Booked" }, { status: "pending" }],
  })
    .populate("serviceid")
    .then((result) => {
      console.log("result for all service", result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not un save the service.");
    });
});

router.get("/api/pastServices/:userid", (req, res) => {
  const userId = req.params.userid;

  MyServices.find({
    userid: userId,
    $or: [{ status: "Booked" }],
  })
    .populate("serviceid")
    .then((result) => {
      console.log("result for all service", result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not un save the service.");
    });
});

router.post("/api/allServicesByWhat/", async (req, res) => {
  try {
    const { what } = req.body;
    if (what === "") {
      res.send([]);
      return;
    }
    const agg = [
      {
        $search: {
          index: "searchauto",
          compound: {
            should: [
              {
                autocomplete: {
                  query: what,
                  path: "serviceName",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
              {
                autocomplete: {
                  query: what,
                  path: "serviceCategory",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
              {
                autocomplete: {
                  query: what,
                  path: "serviceDescription",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
            ],
          },
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          serviceName: 1,
        },
      },
    ];
    await Services.aggregate(agg, (err, searchResult) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send(searchResult);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Could not un save the service.");
  }
});
router.post("/api/allServicesByWhere/", async (req, res) => {
  try {
    const { where } = req.body;
    if (where === "") {
      res.send([]);
      return;
    }
    const agg = [
      {
        $search: {
          index: "searchlocation",
          compound: {
            should: [
              {
                autocomplete: {
                  query: where,
                  path: "city",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
              {
                autocomplete: {
                  query: where,
                  path: "country",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
              {
                autocomplete: {
                  query: where,
                  path: "zipcode",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
              {
                autocomplete: {
                  query: where,
                  path: "streetAddress",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
              {
                autocomplete: {
                  query: where,
                  path: "state",
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
            ],
          },
        },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          _id: 0,
          city: 1,
        },
      },
    ];
    await Services.aggregate(agg, (err, searchResult) => {
      if (err) {
        throw err;
      } else {
        res.status(200).send(searchResult);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("Could not un save the service.");
  }
});

router.post("/api/saveService", (req, res) => {
  console.log("I am at saveservice api");
  const userId = req.body.userId;
  const serviceId = req.body.serviceId;
  MyServices.findOneAndUpdate(
    { serviceid: serviceId, userid: userId, status: "saved" },
    { serviceid: serviceId, userid: userId, status: "saved" },
    { upsert: true }
  )
    .then((result) => {
      console.log("result for saved services", result);
      res.status(200).send("Success");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Not able to fetch services.");
    });
});

router.post("/api/unSaveService", (req, res) => {
  const userId = req.body.userid;
  const serviceId = req.body.serviceid;
  MyServices.findOneAndRemove({
    serviceid: serviceId,
    userid: userId,
    status: "saved",
  })
    .then((result) => {
      console.log("result for deleted service", result);
      res.status(200).send("Success");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not un save the service.");
    });
});

router.get("/api/getBookedSlots/:serviceId/:userId", (req, res) => {
  const userId = req.params.userId;
  const serviceId = req.params.serviceId;
  console.log(`service id is ${serviceId} and user id is ${userId}`);
  MyServices.find({
    $and: [{ serviceid: serviceId }, { userid: userId }],
    $or: [{ status: "Booked" }, { status: "pending" }],
  })
    .select("date time -_id")
    .then((result) => {
      const dateArr = result.map((ele) => {
        let modifiedDate = ele.date.replace(/[/]/g, "-");
        return modifiedDate;
      });
      const timeArr = result.map((ele) => {
        let tim = ele.time.split(":");
        let hour = parseInt(tim[0]);
        let min = parseInt(tim[1]);

        date.setHours(hour, min);
        console.log(`hour ${hour} min ${min}`);
        console.log(date);
        return date;
      });
      const json = {
        date: dateArr,
        time: timeArr,
        dateTimeArr: dateTimeArr,
      };
      console.log(json);
      res.status(200).send(json);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not save the service.");
    });
});
router.post("/api/bookService", (req, res) => {
  const userId = req.body.userid;
  const serviceId = req.body.serviceid;
  const address = req.body.address;
  const phone = req.body.phone;
  const dateSlot = req.body.date;
  const timeSlot = req.body.time;
  if (serviceId == null || serviceId.length == 0)
    return res
      .status(400)
      .send("Could not book the service as your service id  empty.");
  if (userId == null || userId.length == 0)
    return res
      .status(400)
      .send("Could not book the service as your user id  empty.");
  MyServices.findOneAndUpdate(
    { serviceid: serviceId, userid: userId, date: dateSlot, time: timeSlot },
    {
      serviceid: serviceId,
      userid: userId,
      date: dateSlot,
      time: timeSlot,
      address: address,
      phone: phone,
      status: "pending",
    },
    { upsert: true }
  )
    .then((result) => {
      console.log("result for booked service", result);
      res.status(200).send("Success");
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Could not book the service.");
    });
});

module.exports = router;
