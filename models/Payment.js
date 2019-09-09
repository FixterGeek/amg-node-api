const mongoose = require('mongoose')
const Schema = mongoose.Schema

const paymentSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  concept:String,
  conektaId: String,
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
  },
  paymentType:{
    type:String,
    enum:['Subscription', 'Event']
  },
  recipetURL:String
},{
  timestamps:true
})

module.exports = mongoose.model('Payment', paymentSchema)