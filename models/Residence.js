const mongoose = require('mongoose')
const Schema = mongoose.Schema

const residenciaSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  speciality:{
    type:String,
    required:false
  },
  institution:{
    type:Schema.Types.ObjectId,
    ref:'Institution'
  },
  hospital:{
    type:String,
    required:false
  },
  startDate:{
    type:String,
    required:false
  },
  endDate :{
    type:String,
    required:false
  },
  specialityLicence:{
    type:String,
    required:false
  },
  specialityLicenceCopu :{
    type:String,
    required:false
  },
  specialistLicence:{
    type:String,
    required:false
  },  
  specialityDirectorsCertificates:{
    type:String,
    required:false
  },
},{
  timestamps:true
})

module.exports = mongoose.model('Residence', residenceSchema)