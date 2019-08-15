const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const examSchema = new Schema({  
  event:{
    type:Schema.Types.ObjectId,
    ref:'Event'
  },
  title:String,
  date:String,
  beginingTime:String,
  endTime:String,
  questions:[{
    question:String,
    answers:[{
      type:String
    }],
    correct:String
  }],
},{
  timestamps:true
})

module.exports = mongoose.model('Exam', examSchema)