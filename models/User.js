const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

  email:{
    type:String,
    unique:true,    
  },

  //basic data
  datosBasicos:{
    nombre :{
      type:String,      
    },
    apellidoPaterno:{
      type:String,      
    },
    apellidoMaterno:{
      type:String,      
    },
    especialidad :{
      type:String,      
    },
    profileImageURL:{
      type:String,      
    },
    telefono:{
      type:String,      
    },
    estadoCivil :{
      type:String,      
      enum:['Soltero', 'Casado', 'Divorciado', 'Unión Libre', 'Viudo']
    },
    //direccion
    domicilio:{
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
  },
  /**** *cónyugue if casado o unión libre****/
  conyugue:{
    nombre:{
      type:String,
      required:false
    },
    apellidoPaterno:{
      type:String,
      required:false
    },
    apellidoMaterno:{
      type:String,
      required:false
    },
    correo:{
      type:String,
      required:false
    },
    telefono:{
      type:String,
      required:false
    },
  },
  //*** */Condicional labora actualmente en un hospital o institución?***//
  //if applies
  institucionesDondeLabora:[{
    type:Schema.Types.ObjectId,
    ref:'Institucion'
  }],
  //***** Condicional labora posee un consultorio******/

  //if applies
  consultorios:[{
    type:Schema.Types.ObjectId,
    ref:'Institucion'
  }],
  //*** */Datos fiscales***/////Dirección fiscal (calle y número exterior)
  datosFiscales:{
    rfc:{
      type:String,
      required:false
    },
    telefono:{
      type:String,
      required:false
    },
    correo:{
      type:String,
      required:false
    },
    domicilio:{
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
  },

  /************** educación ***********/
  estudios:[{
    type:Schema.Types.ObjectId,
    ref:'Estudio'
  }],    
  /**********Internado de pregrado**********/
  internados:[{
    type:Schema.Types.ObjectId,
    ref:'Internado'
  }],
  /**************Residencias y posgrados ************/
  residencias:[{
    type:Schema.Types.ObjectId,
    ref:'Residencia'
  }],
  //Actividades docentes pasadas y presentes
  actividadesDocentes:[{
    type:Schema.Types.ObjectId,
    ref:'Actividad'
  }],
  //Actividades hospitalarias pasadas y presentes
  actividadesHospitalarias:[{
    type:Schema.Types.ObjectId,
    ref:'Actividad'
  }],
  //Sociedades médicas a las que pertenece *** o usar un modelo por separado para Sociedades
  sociedadesMedicas:[{
    type:Schema.Types.ObjectId,
    ref:'Actividad'
  }],
//  "Miembros de la asociación mexicana de gastroenterología que recomiendan su ingreso"
  miembrosQueRecomiendan:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }],
  //Nombre y firma
  // firma:{
  //   type:String,
//   
  // }

  /*Status Data*/

  fechaRegistro:{
    type:String,    
  },
  membershipStatus:{
    type:String,
    enum:['Pendiente de Pago', 'Pagado', 'Veterano']
  },
  /* Aproval  Data*/
  userStatus:{
    type:String,
    enum:['Registrado', 'Aprobado', 'No Aprobado'],
    default:'Registrado'
  },
  fechaRevision:{
    type:String,
    required:false
  },
  revisadoPor:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }


},{
  timestamps:true
})

userSchema.plugin(plm,{usernameField:'email'})

module.exports = mongoose.model('User', userSchema)