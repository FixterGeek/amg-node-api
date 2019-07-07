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
    birthDate:{
      type:String
    },
    placeOfBirth:{
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
    fullName:{
      type:String,      
    },
    email:{
      type:String,      
    },
    phone:{
      type:String,      
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
    },
    phone:{
      type:String,      
    },
    email:{
      type:String,      
    },
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
    enum:['Registrado','Pendiente', 'Aprobado', 'No Aprobado'],
    default:'Registrado'
  },
  revisionDate:{
    type:String,    
  },
  reviwedBy:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  renewals:[{
    type:Schema.Types.ObjectId,
    ref:'Payment'
  }]


},{
  timestamps:true
})

userSchema.plugin(plm,{usernameField:'email'})

module.exports = mongoose.model('User', userSchema)