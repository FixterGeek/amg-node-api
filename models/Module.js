const mongoose = require('mongoose')
const Schema = mongoose.Schema

const moduleSchema = new Schema({  
  event:{
    type:Schema.Types.ObjectId,
    ref:'Event'
  },
  description:String,
  title:String,
  date:String,
  activities:[{
    type:Schema.Types.ObjectId,
    ref:'EventActivity'
  }]
  
},{
  timestamps:true
})

module.exports = mongoose.model('Module', moduleSchema)


