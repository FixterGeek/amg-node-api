const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')
const Schema = mongoose.Schema
const slug = require('mongoose-slug-generator');


const userSchema = new Schema({
  recoveryToken: Boolean,
  slug: {
    type: String,
    slug: ["username"],
    unique: true
  },
  email: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    unique: true,
  },
  titleURL: String,
  certificateURL: String,
  constancyURL: String,
  address: {
    type: {
      type: String,
      default: 'Point'
    },
    addressName: {
      type: String,
    },
    street: {
      type: String,
    },
    outdoorNumber: {
      type: String,
    },
    interiorNumber: {
      type: String,
    },
    colony: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    coordinates: [{
      type: Number
    }]
  },

  //basic data
  basicData: {
    gender: String,
    name: {
      type: String,
    },
    dadSurname: {
      type: String,
    },
    momSurname: {
      type: String,
    },
    birthDate: {
      type: String
    },
    bio: {
      type: String
    },
    placeOfBirth: {
      type: {
        type: String,
        default: 'Point'
      },
      addressName: {
        type: String,
      },
      street: {
        type: String,
      },
      outdoorNumber: {
        type: String,
      },
      interiorNumber: {
        type: String,
      },
      colony: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      coordinates: [{
        type: Number
      }]
    },
    title: {
      type: String,
    },
    speciality: {
      type: String,
      enum: ['Gastroenterología', 'Endoscopia', 'Motilidad', 'Medicina Interna', 'Cirujano', 'Otra']
    },
    photoURL: {
      type: String,
    },
    phone: {
      type: String,
    },
    civilStatus: {
      type: String,
      enum: ['Soltero', 'Casado', 'Divorciado', 'Unión Libre', 'Viudo']
    },
    //direccion
    address: {
      type: {
        type: String,
        default: 'Point'
      },
      addressName: {
        type: String,
      },
      street: {
        type: String,
      },
      outdoorNumber: {
        type: String,
      },
      interiorNumber: {
        type: String,
      },
      colony: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      coordinates: [{
        type: Number
      }]
    },
  },
  /**** *cónyugue if casado o unión libre****/
  spouse: {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  //***** Condicional labora posee un consultorio******/

  //if applies consultorios
  consultories: [{
    type: Schema.Types.ObjectId,
    ref: 'Institution'
  }],
  //*** */Datos fiscales***/////Dirección fiscal (calle y número exterior)
  fiscalData: {
    rfc: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    address: {
      type: {
        type: String,
        default: 'Point'
      },
      addressName: {
        type: String,
      },
      street: {
        type: String,
      },
      outdoorNumber: {
        type: String,
      },
      interiorNumber: {
        type: String,
      },
      colony: {
        type: String,
      },
      zipCode: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      coordinates: [{
        type: Number
      }]
    },
  },

  following: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  /************** educación ***********/
  studies: [{
    type: Schema.Types.ObjectId,
    ref: 'Study'
  }],
  /**********Internado de pregrado**********/
  internships: [{
    type: Schema.Types.ObjectId,
    ref: 'Internship'
  }],
  /**************Residencias y posgrados ************/
  residencies: [{
    type: Schema.Types.ObjectId,
    ref: 'Residence'
  }],
  //Actividades docentes pasadas y presentes
  teachingActivities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  //Activityes hospitalarias pasadas y presentes
  hospitalActivities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  //Sociedades médicas a las que pertenece *** o usar un modelo por separado para Sociedades
  medicalSocieties: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }],

  //events related
  assistedEvents: [{
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }],

  assistedActivities: [{
    type: Schema.Types.ObjectId,
    ref: 'EventActivity'
  }],
  //courses related
  enrolledCourses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],

  enrolledActivities: [{
    type: Schema.Types.ObjectId,
    ref: 'CourseActivity'
  }],
  //  "Miembros de la asociación mexicana de gastroenterología que recomiendan su ingreso"
  membersWhoRecommend: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  /*Status Data*/

  registrationDate: {
    type: String,
  },
  membershipStatus: {
    type: String,
    enum: ['Free', 'Residente', 'Socio', 'Socio en Entrenamiento', 'Veterano', 'Mesa Directiva'],    
    default: 'Free'
  },
  selectables:[{
    type:String
  }],
  /* Aproval  Data*/
  userStatus: {
    type: String,
    enum: ['Registrado', 'Pendiente', 'Aprobado', 'No Aprobado', 'Activo', 'Inactivo'],
    default: 'Registrado'
  },
  userType: {
    type: String,
    enum: ['Member', 'Editor', 'Admin', 'Filial'],
    default: 'Member'
  },
  revisionDate: {
    type: String,
  },
  reviwedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  renewals: [{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  eventOrders: [{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  courseOrders: [{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  deleted:{
    type:Boolean,
    default:false
  },
  deletedBy:{
    type:String,
    enum:['Admin', 'Self']
  },
  /************************Files************************************/
  residentLetterURLS:[{
    type:String
  }],
  filialAsUser:{
    type:Schema.Types.ObjectId,
    ref:'Filial'
  },
  filialAsAdmin:{
    type:Schema.Types.ObjectId,
    ref:'Filial'
  },
  mails:{
    rejected:{
      type: Boolean,
      default: false
    },
    approved:{
      type: Boolean,
      default: false
    },
    inRevision:{
      type: Boolean,
      default: false
    },
  },
  socioStatus:{
    activo:{
      cost:Number,
      assigned:{
        type: Boolean,
        default: false
      }
    },
    titular:{
      cost:Number,
      assigned:{
        type: Boolean,
        default: false
      }
    },
    emerito:{
      cost:Number,
      assigned:{
        type: Boolean,
        default: false
      }
    }
  }


}, {
    timestamps: true
  })

userSchema.plugin(slug);

userSchema.plugin(plm, { usernameField: 'email' })

module.exports = mongoose.model('User', userSchema)