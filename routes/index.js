const express = require('express');
const router  = express.Router();
const fs = require('fs')
const data = require('../amg.json')
const users = require('../users.json')
const institutions = require('../institutions.json')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId


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

module.exports = router;



