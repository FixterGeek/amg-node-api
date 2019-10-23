const mongoose = require('mongoose')
const Schema = mongoose.Schema

const moduleSchema = new Schema({  
  course:{
    type:Schema.Types.ObjectId,
    ref:'Course'
  },
  description:String,
  title:String,
  date:String,
  activities:[{
    type:Schema.Types.ObjectId,
    ref:'CourseActivity'
  }]
  
},{
  timestamps:true
})

module.exports = mongoose.model('CourseModule', moduleSchema)


