const mongoose = require('mongoose')
const Schema = mongoose.Schema

const internshipSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  institution:{
    type:Schema.Types.ObjectId,
    ref:'Institution'
  },
  startDate:{
    type:String,
    required:false
  },
  endDate :{
    type:String,
    required:false
  },  
},{
  timestamps:true
})

module.exports = mongoose.model('Internship', internshipSchema)