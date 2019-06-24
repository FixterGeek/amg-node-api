const mongoose = require('mongoose')
const Schema = mongoose.Schema

const actividadSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  tipo:{
    type:String,
    enum:['Hospitalaria', 'Docente', 'Sociedad'],
    required:true
  },
  institucion:{
    type:Schema.Types.ObjectId,
    ref:'Institucion',
    required:true    
  },
  //If Docente
  materia:{
    type:String,
    required:false
  },
  //If Hospitalaria
  cargo :{
    type:String,
    required:false
  },
  fechaInicio :{
    type:String,
    required:false
  },
  fechaFin :{
    type:String,
    required:false
  },
}, {
  timestamps:true
})

module.exports = mongoose.model('Actividad', actividadSchema)