const mongoose = require('mongoose')
const Schema = mongoose.Schema

const studySchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  major:{
    type:String,
    required:false
  },
  institution:{
    type:Schema.Types.ObjectId,
    ref:'Institution', 
    required:false   
  },
  startDate:{
    type:String,
    required:false
  },
  endDate:{
    type:String,
    required:false
  },
  //(Año de titulación)
  receptionDate :{
    type:String,
    required:false
  },
  professionalLicence:{
    type:String,
    required:false
  },
},{
  timestamps:true
})

module.exports = mongoose.model('Study', studySchema) 
