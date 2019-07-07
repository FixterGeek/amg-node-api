const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  date:{
    type:String,
    required:true    
  },
  amount:{
    type:Number,
    required:true
  },
  paid:{
    type:Boolean,
    default:false
  }
},{
  timestamps:true
})

module.exports = mongoose.model('Payment', paymentSchema)