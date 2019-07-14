const mongoose = require('mongoose')
const Schema = mongoose.Schema

const publicationSchema = new Schema({

  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  urls:[{
    type:String
  }],
  images:[{
    type:String
  }],
  docs:[{
    type:String
  }],
  text:String,
  liked:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }]

},{
  timestamps:true
})

module.exports = mongoose.model('Publication', publicationSchema)