const mongoose = require('mongoose')
const Schema = mongoose.Schema

const activitySchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  type:{
    type:String,
    enum:['Hospitalaria', 'Docente', 'Sociedad', 'Laboral'],
    required:true
  },
  institution:{
    type:Schema.Types.ObjectId,
    ref:'Institution',
    required:true    
  },
  //If Docente
  subject:{
    type:String,
    required:false
  },
  //If Hospitalaria
  charge :{
    type:String,
    required:false
  },
  startDate :{
    type:String,
    required:false
  },
  endDate :{
    type:String,
    required:false
  },
}, {
  timestamps:true
})

module.exports = mongoose.model('Activity', activitySchema)