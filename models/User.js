const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

  email:{
    type:String,
    unique:true,    
  },

  //basic data
  basicData:{
    name :{
      type:String,      
    },
    dadSurname:{
      type:String,      
    },
    momSurname:{
      type:String,      
    },
    speciality :{
      type:String,      
    },
    photoURL:{
      type:String,      
    },
    phone:{
      type:String,      
    },
    civilStatus :{
      type:String,      
      enum:['Soltero', 'Casado', 'Divorciado', 'Unión Libre', 'Viudo']
    },
    //direccion
    address:{
      type:{
          type:String,
          default:'Point'
      },
      addressName:{
        type:String,      
      },
      street:{
        type:String,      
      },
      outdoorNumber:{
        type:String,      
      },
      interiorNumber:{
        type:String,      
      },
      colony:{
        type:String,      
      },
      zipCode:{
        type:String,      
      },
      city:{
        type:String,      
      },
      state:{
        type:String,      
      },
      coordinates:[{
          type:Number
      }]
    },    
  },
  /**** *cónyugue if casado o unión libre****/
  spouse:{
    name:{
      type:String,
      required:false
    },
    dadSurname:{
      type:String,
      required:false
    },
    momSurname:{
      type:String,
      required:false
    },
    email:{
      type:String,
      required:false
    },
    phone:{
      type:String,
      required:false
    },
  },
  //*** */Condicional labora actualmente en un hospital o institución?***//
  //if applies
  workedAtInstitutions:[{
    type:Schema.Types.ObjectId,
    ref:'Institution'
  }],
  //***** Condicional labora posee un consultorio******/

  //if applies consultorios
  consultories:[{
    type:Schema.Types.ObjectId,
    ref:'Institution'
  }],
  //*** */Datos fiscales***/////Dirección fiscal (calle y número exterior)
  fiscalData:{
    rfc:{
      type:String,
      required:false
    },
    phone:{
      type:String,
      required:false
    },
    email:{
      type:String,
      required:false
    },
    location:{
      type:{
          type:String,
          default:'Point'
      },
      addressName:{
        type:String,      
      },
      street:{
        type:String,      
      },
      outdoorNumber:{
        type:String,      
      },
      interiorNumber:{
        type:String,      
      },
      colony:{
        type:String,      
      },
      zipCode:{
        type:String,      
      },
      city:{
        type:String,      
      },
      state:{
        type:String,      
      },
      coordinates:[{
          type:Number
      }]
    },
  },

  /************** educación ***********/
  studies:[{
    type:Schema.Types.ObjectId,
    ref:'Study'
  }],    
  /**********Internado de pregrado**********/
  internships:[{
    type:Schema.Types.ObjectId,
    ref:'Internship'
  }],
  /**************Residencias y posgrados ************/
  residencies:[{
    type:Schema.Types.ObjectId,
    ref:'REsidency'
  }],
  //Actividades docentes pasadas y presentes
  teachingActivities:[{
    type:Schema.Types.ObjectId,
    ref:'Activity'
  }],
  //Activityes hospitalarias pasadas y presentes
  hospitalActivities:[{
    type:Schema.Types.ObjectId,
    ref:'Activity'
  }],
  //Sociedades médicas a las que pertenece *** o usar un modelo por separado para Sociedades
  medicalSocieties:[{
    type:Schema.Types.ObjectId,
    ref:'Activity'
  }],
//  "Miembros de la asociación mexicana de gastroenterología que recomiendan su ingreso"
  membersWhoRecommend:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }],
  //Nombre y firma
  // firma:{
  //   type:String,
//   
  // }

  /*Status Data*/

  registrationDate:{
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
  revisionDate:{
    type:String,
    required:false
  },
  reviwedBy:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }


},{
  timestamps:true
})

userSchema.plugin(plm,{usernameField:'email'})

module.exports = mongoose.model('User', userSchema)