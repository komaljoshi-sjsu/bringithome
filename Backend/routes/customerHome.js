'use strict'
const express = require('express')
const router = express.Router()
const conn = require('../config/mysql_connection')
const mongoose = require('mongoose')
const { json } = require('body-parser')

const Service = require('../models/Service')
const MyServices = require('../models/MyServices');

router.get('/customer/home/:currentPage/:userid', async(req, res) => {
  const postsPerPage = 5;
  const userid = req.params.userid;
  const currentPage = req.params.currentPage;
  const skip = postsPerPage*(currentPage-1);
  const totalPosts = await Service.count();
  console.log(`Current Page is ${currentPage} and total posts are ${totalPosts}`)
  Service.find().skip(skip).limit(postsPerPage).then(async(result) => {
    
    if(userid == null || userid == 'null') {
      let results = {
        services: result,
        totalPosts: totalPosts
      }
      console.log('Result:',results);
      return res.status(200).send(results);
    }
    let finalRes = await Promise.all(
      result.map(async(data)=> {
        var copy = JSON.parse(JSON.stringify(data));
        let isSaved = false;
        await MyServices.find({serviceid:data._id,status:'saved',userid:userid}).then(result1=> {
          //console.log('Service results:',result1)
          if(result1.length == 0) {
            //console.log('no saved service present');
          } else {
            console.log('saved service present ',data);
            isSaved = true;
            
          }
        })
        copy.save = isSaved
        return copy;
      })
    )
    console.log('finalres',finalRes)
    let results = {
      services: finalRes,
      totalPosts: totalPosts
    }
    res.status(200).send(results);
  }).catch(err=> {
    console.log('Error while getting home data for customer:',err);
    res.status(400);
  })
})

module.exports = router
