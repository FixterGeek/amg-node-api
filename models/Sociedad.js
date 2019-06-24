const mongoose = require('mongoose')
const Schema = mongoose.Schema

const sociedadSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  institucion:{
    type:Schema.Types.ObjectId,
    ref:'Institucion'
  },
  fechaIncio:{
    type:String,
    required:false
  },
  fechaFin :{
    type:String,
    required:false
  },
},{
  timestamps:true
})

module.exports = mongoose.model('Sociedad', sociedadSchema)