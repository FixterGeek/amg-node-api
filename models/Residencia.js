const mongoose = require('mongoose')
const Schema = mongoose.Schema

const residenciaSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  especialidad:{
    type:String,
    required:false
  },
  institucion:{
    type:Schema.Types.ObjectId,
    ref:'Institucion'
  },
  hospital:{
    type:String,
    required:false
  },
  fechaInicio:{
    type:String,
    required:false
  },
  fechaFin :{
    type:String,
    required:false
  },
  cedulaEspecialidad:{
    type:String,
    required:false
  },
  copiaTituloEspecialidad :{
    type:String,
    required:false
  },
  cedulaEspecialista:{
    type:String,
    required:false
  },
  certificadosConsejoEspecialidad:{
    type:String,
    required:false
  },
},{
  timestamps:true
})

module.exports = mongoose.model('Residencia', residenciaSchema)