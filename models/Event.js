const mongoose = require('mongoose')
const Schema = mongoose.Schema


const eventSchema = new Schema({
//Datos Generales
  nombre:{
    type: String,
    required:false
  },
  fechaInicio:{
    type: String,
    required:false
  },
  fechaFinal:{
    type: String,
    required:false
  },
  sede:{
    type: String,
    required:false
  },
  ciudad:{
    type: String,
    required:false
  },
  estado:{
    type: String,
    required:false
  },
  valorCurricular:{
    type: String,
    required:false
  },
  numeroRegistroCurricular:{//numero de registro curricular al que pertenece:
    type: String,
    required:false
  },
  institucionCurricular:{//institución que otorga valor curricular:{
    type: String,
    required:false
  },
  dirigidoA:{ //tags de especialidades:{
    type: String,
    required:false
  },
  costo:{
    type: String,
    required:false
  },
  contacto:{
    type: String,
    required:false
  },

//Ubicación
  sede:{
    type: String,
    required:false
  },
  direccion:{
    type: String,
    required:false
  },

//Programa
  nombreActividad:{
    type: String,
    required:false
  },
  tipoActividad:{
    type: String,
    required:false
  },
  fecha:{
    type: String,
    required:false
  },
  horaInicio:{
    type: String,
    required:false
  },
  ubicacion:{
    type: String,
    required:false
  },
  ponente:{
    type: String,
    required:false
  },
  coordinador:{
    type: String,
    required:false
  },
  participante:{
    type: String,
    required:false
  },
  modulo:{
    type: String,
    required:false
  },
  tituloModulo:{
    type: String,
    required:false
  },
  coordinadorModulo:{
    type: String,
    required:false
  },

//ivote
  tituloActividad:{
    type: String,
    required:false
  },
  crearCuestionario:{ //???:{
    type: String,
    required:false
  },
//Ponente
  titulo:{
    type: String,
    required:false
  },
  nombreCompleto:{
    type: String,
    required:false
  },
  origen:{
    type: String,
    required:false
  },
  bio:{
    type: String,
    required:false
  },
  actividades:{ //actividades en que participa:{
    type: String,
    required:false
  },

//Directorio
//Mesa directiva:
  presidente:{
    type: String,
    required:false
  },
  vicepresidente:{
    type: String,
    required:false
  },
  secretario:{
    type: String,
    required:false
  },
  tesorero:{
    type: String,
    required:false
  },
  protesorero:{
    type: String,
    required:false
  },
  secretarioActas:{
    type: String,
    required:false
  },
  secretarioRelaciones:{
    type: String,
    required:false
  },
//Consejo Consultivo:{

  consejoConsultivo:[{ // [personas]
    type: String,
    required:false
  }],
//Directores de Curso:{
  
  directorCurso:{
    type: String,
    required:false
  },
//Cordinador General:{
  
  cordinadorGeneral:{
    type: String,
    required:false
  },
//Asociaciones participantes
 
  nombreInstitucion:{
    type: String,
    required:false
  },
  presidente:{
    type: String,
    required:false
  },
  logo:{
    type: String,
    required:false
  },
//Imagen
  imagenEvento:{
    type: String,
    required:false
  },
  logosInstituciones:{ //[]:{
    type: String,
    required:false
  },
//Descargables //files:{
  
  permiso :{
    type: String,
    required:false
  },
  constancia:{
    type: String,
    required:false
  },
  programa :{
    type: String,
    required:false
  },
},{
  timestamps:true
})

module.exports = mongoose.model('Event', eventSchema)