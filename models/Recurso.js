const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recursoSchema = new Schema({

  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  url:String,
  imagesURLS:[{
    type:String
  }],
  docsURLS:[{
    type:String
  }],
  title:String,
  subtitle:String,
  footer:String,
  liked:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }]

},{
  timestamps:true
})

module.exports = mongoose.model('Recurso', recursoSchema)