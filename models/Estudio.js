const mongoose = require('mongoose')
const Schema = mongoose.Schema

const estudioSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  carrera:{
    type:String,
    required:false
  },
  institucion:{
    type:Schema.Types.ObjectId,
    ref:'Institucion', 
    required:false   
  },
  fechaInicio:{
    type:String,
    required:false
  },
  fechaFin:{
    type:String,
    required:false
  },
  //(Año de titulación)
  fechaRecepcion :{
    type:String,
    required:false
  },
  cedulaProfesional:{
    type:String,
    required:false
  },
},{
  timestamps:true
})

module.exports = mongoose.model('Estudio', estudioSchema) 
