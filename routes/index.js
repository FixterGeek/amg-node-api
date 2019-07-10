const express = require('express');
const router  = express.Router();
const fs = require('fs')
const data = require('../amg.json')
const users = require('../users.json')
const institutions = require('../institutions.json')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId
const cloudfile = './helpers/amg-backend-0267e0073f11.json'


/* GET home page */
router.get('/', (req, res, next) => {  

  const arr = []
  data.forEach((item, idx)=>{
    if(item['Institución']=='Pensionado'|| item['Institución']=='Jubilado' || item['Institución']=='NO APLICA' || institutions[idx]==undefined)return
    console.log(institutions[idx])
    const newObject = {
      _id:new ObjectId(),
      user: users[idx]._id,
      type:'Hospitalaria',
      institution:institutions[idx]._id,
      //If Docente
      subject:'',
      //If Hospitalaria
      charge :item['Especialidad'],
      startDate :'',
      endDate :''
    }
    arr.push(newObject)
  })
  console.log(arr)
  fs.writeFile("activities.json", JSON.stringify(arr),'utf8',(err)=>{
    console.log(err)
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



