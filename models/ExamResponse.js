const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const responseSchema = new Schema({  
  exam:{
    type:Schema.Types.ObjectId,
    ref:'Exam'
  },
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  answers:[{
    question:String,
    answer:String
  }],
  score:Number
},{
  timestamps:true
})

module.exports = mongoose.model('ExamResponse', responseSchema)