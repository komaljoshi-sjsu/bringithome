"use strict";
const express = require("express");
const router = express.Router();
const conn = require("./../config/mysql_connection");
const { auth } = require("../config/passport");
const JobSeeker = require('../models/JobSeeker');
auth();

const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new aws.S3({
  accessKeyId: 'AKIAYOG23DSW7KVLQRVN',
  secretAccessKey: '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',
  Bucket: "273indeed",
});

router.post("/api/updateJobSeekerProfile", (req, res) => {
    try {
        const cid = req.body.id;
        const data = req.body.data;
        let queryKeys = '';
        let queryVal = [];
        let respData = {
            msg: 'success',
            code: '200'
        }
        for(let key in data) {
            if(queryKeys.length == 0) {
                queryKeys = key+'=?';
            } else {
                queryKeys += ','+key+'=?';;
            }

            queryVal.push(data[key]);
        }
        if(queryKeys.length == 0) {
            respData.code = '203';
            respData.msg = 'No data came from the client';
            return res.send(respData);
        }
        queryVal.push(cid);
        const queryStr = 'UPDATE JobSeeker SET '+queryKeys+' WHERE id=?';
        console.log(queryStr);
        conn.query(queryStr,queryVal,(err,result)=> {
            if(err) {
                console.log(err);
                respData.code = '203';
                respData.msg = 'Failed to update profile for the job seeker.';
                respData.err = err;
                return res.send(respData);
            } else {
                return res.send(respData);
            }
        })
        
    }
    catch (error) {
        console.log("ERROR while updating job seeker",error);
        respData.code = '203';
        respData.msg = 'Failed to update profile for the job seeker.';
        respData.err = err;
        return res.send(respData);
    }
});

router.post("/api/setJobPreferences", (req, res) => {
    try {
        const jid = req.body.id;
        const data = req.body.data;
        let respData = {
            msg: 'success',
            code: '200'
        }
        const prefKeys = ['Job Title','Job Types','Work Schedules','Pay','Relocation','Remote'];
        let updateKey = '';
        for(let key in data) {
            updateKey = key;
            if(!prefKeys.includes(key)) {
                respData.code = '400';
                respData.msg = 'Invalid job preference "'+key+'" sent from client';
                return res.send(respData);
            }
        }
        let upJson = {};
        upJson['jobPreference.'+updateKey] = data[updateKey];
        JobSeeker.findOneAndUpdate({jobSeekerId:jid},{$set: upJson}).then(result=> {
            return res.send(respData);
        }).catch(err=> {
            respData.err = err;
            respData.code = '400';
            respData.msg = 'Failed to update job preference. Please refer console for more details';
            return res.send(respData);
        })
        
    }
    catch (error) {
        console.log("ERROR!!!!!",error);
        return res.status(400).send("Failed to update jobseeker preference");
    }
});

router.post("/api/uploadResume/:id", (req, res) => {
    console.log("key" + s3.accessKeyId);
    console.log("secretAccessKey" + s3.secretAccessKey);
    let respData = {
        msg: 'success',
        code: '200'
    }
    uploadResume(req, res, (error) => {
      if (error) {
        console.log("Error uploading resume", error);
        respData.code = '400';
        respData.msg = error;
        return res.send(respData);
      } else {
        if (req.file === undefined) {
            console.log("No resume uploaded");
            respData.code = '400';
            respData.msg = 'Please upload a resume';
            return res.send(respData);
        } else {
          const fileName = req.file.key;
          const fileLocation = req.file.location;
          if (isEmpty(fileName) || isEmpty(fileLocation)) {
            console.log("File data does not exist");
            respData.code = '400';
            respData.msg = 'File data does not exist';
            return res.send(respData);
          } else {
            console.log("Image loc from backend" + fileLocation);
            JobSeeker.findOneAndUpdate({jobSeekerId:req.params.id},{resumeUrl:fileLocation}).then(success=>{
                respData.location = fileLocation;
                respData.key = fileName;
                return res.send(respData);
            }).catch(err=> {
                respData.code='203';
                respData.msg = 'Failed to set resume location on database. Please contact admimistrator';
                return res.send(respData);
            })
          }
        }
      }
    });
});

router.get("/api/downloadResume/:key", async(req, res) => {
    try {
        // const { Body } = await s3.getObject({
        //     Key: key,
        //     Bucket: '273indeed'
        // });
        const signedUrlExpireSeconds = 60*2 ;// your expiry time in seconds.

        const url = s3.getSignedUrl('getObject', {
            Bucket: '273indeed',
            Key: req.params.key,
            Expires: signedUrlExpireSeconds
        })
        return res.status(200).send(url);
    } catch(err) {
        console.log('Failed to download  resume:',err);
        return res.status(400).send('Failed to download resume');
    }
})

router.delete("/api/deleteResume/:key/:id", async(req, res) => {
    try {
        const key = req.params.key;
        const id = req.params.id;
        s3.deleteObject({
            Key: key,
            Bucket: '273indeed'
        }, (err,data)=>{
            if(err) {
                console.log('deletion failed',err)
                return res.status(400).send('Failed to delete resume');
            } else {
                console.log('Successfully deleted resume with key ',key);
                JobSeeker.findOneAndUpdate({jobSeekerId:id},{resumeUrl:''}).then(success=>{
                    return res.status(200).send('success');
                }).catch(err=> {
                    return res.status(400).send('Failed to delete resume url from mongo.');
                })
            }
        });
    } catch(err) {
        console.log('Failed to download  resume:',resume);
        return res.status(400).send('Failed to delete resume');
    }
})

const uploadResume = multer({
    storage: multerS3({
      s3: s3,
      bucket: "273indeed",
      acl: "public-read",
      key: function (req, file, cb) {
        file.originalname = 'resume_'+req.params.id;
        console.log('id is:',req.body.id);
        cb(
          null,
          path.basename(file.originalname, path.extname(file.originalname))
        );
      },
    }),
    limits: { fileSize: 2000000 }, // 2 MB
    fileFilter: function (req, file, cb) {
      console.log(file.originalname);
      validateFileType(file, cb);
    },
  }).single("file");
  
  function validateFileType(file, cb) {
    const allowedFileType = /pdf|doc|docx/;
    const mimeType = allowedFileType.test(file.mimetype);
    const extname = allowedFileType.test(
      path.extname(file.originalname).toLowerCase()
    );
  
    if (mimeType && extname) {
      return cb(null, true);
    } else {
      cb("Please upload pdf, doc, docx documents only!");
    }
  }
  
  function isEmpty(value) {
    return value === undefined || value == null || value.length <= 0 ? true : false;
  }

module.exports = router;
