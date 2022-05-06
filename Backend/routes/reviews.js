"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const Service = require('../models/Service');
const Review = require('../models/Review');

router.get("/api/getReviews/:userid", (req, res) => {
    const userId = req.params.userid;
    Review.find({userid:userId}).populate({path:'service'}).then(async(result)=> {
        res.status(200).send(result);
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Could not get reviews.');
    })
    
});


router.get("/api/allReviews/:currentPage", async (req, res) => {
    const postsPerPage = 18;
    const currentPage = req.params.currentPage;
    const skip = postsPerPage*(currentPage-1);
    const totalPosts = await Review.count();
    Review.find().skip(skip).limit(postsPerPage).populate('service').then(async(result)=> {
        console.log('applied serv;',result);
        let reviews = {
            reviews: result,
            totalReviews: totalPosts
        }
        res.status(200).send(reviews);
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Could not get reviews.');
    })
});

router.post("/api/postReview", (req, res) => {
    const userid = req.body.userid;
    const serviceid = mongoose.Types.ObjectId(req.body.serviceid);
    const rating = req.body.rating;
    const review = req.body.review;
    const title = req.body.title;
    const postedOn = Date().toLocaleString();

    const reviewData = new Review({
        userid: userid,
        service: serviceid,
        rating: parseFloat(rating),
        review: review,
        title: title,
        postedOn: postedOn
    });

    reviewData.save().then(async(result)=> {
        console.log('saved review',result);
        res.status(200).send('success');
    }).catch(err=> {
        console.log(err);
        res.status(400).send('Could not save review.');
    })
});
module.exports = router
