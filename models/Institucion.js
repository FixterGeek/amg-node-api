const mongoose = require('mongoose')
const Schema = mongoose.Schema

const institucionSchema = new Schema({
  // si aplica, 
  propietario:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  nombre:{
    type:String,
    required:true
  },
  tipo:{
    type:String,
    required:true,
    enum:['Hospital', 'Escuela', 'Consultorio', 'Sociedad']
  },
  ubicacion:{
    type:{
        type:String,
        default:'Point'
    },
    direccion:{
      type:String,
      required:false
    },
    calle:{
      type:String,
      required:false
    },
    numeroExterior:{
      type:String,
      required:false
    },
    numeroInterior:{
      type:String,
      required:false
    },
    colonia:{
      type:String,
      required:false
    },
    codigoPostal:{
      type:String,
      required:false
    },
    ciudad:{
      type:String,
      required:false
    },
    estado:{
      type:String,
      required:false
    },
    coordenadas:[{
        type:Number
    }]
  },  
  telefonos:[{
    type:Number
  }],
  correo:{
    type:String,
    required:false
  },
  // celular:{
  //   type:String,
  //   required:false
  // },
  
},{
  timestamps:true
})

module.exports = mongoose.model('Institucion', institucionSchema) 
