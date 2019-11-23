const express = require('express');
const router = express.Router();
const fs = require('fs')
const data = require('../amg.json')
const users = require('../users.json')
const institutions = require('../institutions.json')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const cloudfile = './helpers/amg-backend-0267e0073f11.json'


/* GET home page */
router.get('/', (req, res, next) => {
  res.json({
    developedBy: "FixterGeek",
    year: 2019,
    site: "www.fixter.org",
    signatures: {
      bliss: "t(*_*t)",
      oswaldinho: "💪🏽🤓"
    }
  })
});


// router.get('/lol',(req, res, next)=>{
//   const {Storage} = require('@google-cloud/storage');
//   const storage = new Storage({
//     projectId: process.env.GCLOUD_PROJECT,
//     keyFilename: cloudfile
//   });

//   /**
//    * TODO(developer): Uncomment these variables before running the sample.
//    */
//    const bucketName = 'amg-bucket';

//   async function createBucket() {
//     // Creates the new bucket
//     await storage.createBucket(bucketName);
//     console.log(`Bucket ${bucketName} created.`);
//   }

//   createBucket()
//     .then(()=>console.log('yhei'))
//     .catch(e=>console.log(e))
// })
module.exports = router;



