const express = require("express");
const aws = require("aws-sdk");
const multerS3 = require("multer-s3");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const mongoose = require("mongoose");
const Photo = mongoose.model("Photo");
const dotenv = require("dotenv");
dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  Bucket: "273indeed",
});

router.post("/api/upload", (req, res) => {
  console.log("key" + s3.accessKeyId);
  console.log("secretAccessKey" + s3.secretAccessKey);
  uploadImg(req, res, (error) => {
    if (error) {
      console.log("Error on image upload", error);
      res.json({ error: error });
    } else {
      if (req.file === undefined) {
        res.json("No File Selected");
      } else {
        const imageName = req.file.key;
        const imageLocation = req.file.location;
        if (isEmpty(imageName) || isEmpty(imageLocation)) {
          return res.status(400).send("Image data doesn't exist");
        } else {
          console.log("Image loc from backend" + imageLocation)
          return res.status(200).json({ imageLocation: imageLocation });
        }
      }
    }
  });
});

const uploadImg = multer({
  storage: multerS3({
    s3: s3,
    bucket: "273indeed",
    acl: "public-read",
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          "-" +
          Date.now() +
          path.extname(file.originalname)
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
  const allowedFileType = /jpeg|jpg|png|gif|jfif/;
  const mimeType = allowedFileType.test(file.mimetype);
  const extname = allowedFileType.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

function isEmpty(value) {
  return value === undefined || value == null || value.length <= 0 ? true : false;
}

router.post("/api/uploadCompanyPhotos", async (req, res) => {
  try {
    const { jobSeekerId, companyId, imageLocation, photoAdminReviewedStatus } =
      req.body;
      console.log(req.body);
    const photoDtls = new Photo({
      jobSeekerId,
      companyId,
      imageLocation,
      photoAdminReviewedStatus,
    });
    photoDtls
      .save()
      .then((result) => {
        console.log(photoDtls)
        return res.status(200).json({ photoDtls: result });
      })
      .catch((err) => {
        return res
          .status(400)
          .json({ error: "Error while inserting photo details" + err });
      });
  } catch (err) {
    return res.status(400).json({ error: "error" });
  }
});

module.exports = router;
