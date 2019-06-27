**User Model**
{
  email:"example@example.com"

  ***basic data***
  basicData:{
    "name" :"oswaldinho",
    "dadSurname":"Martinez",
    "momSurname":"Anaya",
    "birthDate":"31/08/1996",
    "placeOfBirth":{     ,
      "addressName":"Pachuca",
      "street":"",
      "outdoorNumber":"",
      "interiorNumber":"",
      "colony":"",
      "zipCode":"",
      "city":"Pachuca",
      "state":"Hidalgo",
      "coordinates":["123312","123123"]
    },
    speciality :"Especialidad",
    photoURL:"lafoto.jpg"
    phone:"1234567890"
    civilStatus :enum:['Soltero', 'Casado', 'Divorciado', 'Unión Libre', 'Viudo'],
    //direccion
    address:{
      "addressName":"Pachuca",
      "street":"",
      "outdoorNumber":"",
      "interiorNumber":"",
      "colony":"",
      "zipCode":"",
      "city":"Pachuca",
      "state":"Hidalgo",
      "coordinates":["123312","123123"]
    },    
  },
  ***cónyugue if casado o unión libre***
  spouse:{
    "name":"spouse name",
    "dadSurname":"elapellido",
    "momSurname":"el otro apellido"
    "email":"email@conyugue.com"
    phone:"1234567890"
  },
  
  *** */Datos fiscales***
  fiscalData:{
    "rfc":"1234567RTY"
    "phone":"1234567890"
    "email":"email@email.com"
    address:{
      "addressName":"Pachuca",
      "street":"",
      "outdoorNumber":"",
      "interiorNumber":"",
      "colony":"",
      "zipCode":"",
      "city":"Pachuca",
      "state":"Hidalgo",
      "coordinates":["123312","123123"]
    }, 
  },

  ***Status Data***
  registrationDate:"01/01/2010",
  membershipStatus:enum:['Pendiente de Pago', 'Pagado', 'Veterano'],

  *** Aproval  Data ***
  userStatus:enum:['Registrado', 'Aprobado', 'No Aprobado'],
  revisionDate:"01/01/2010",
  reviwedBy:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },

  *** "Miembros de la asociación mexicana de gastroenterología que recomiendan su ingreso" ***
  membersWhoRecommend:[{
    type:Schema.Types.ObjectId,
    ref:'User'
  }],

***/Condicional labora actualmente en un hospital o institución?***
  //if applies
  workedAtInstitutions:[{
    type:Schema.Types.ObjectId,
    ref:'Institution'
  }],
  *** Condicional labora posee un consultorio ***
  //if applies
  consultories:[{
    type:Schema.Types.ObjectId,
    ref:'Institution'
  }],
  
  *** educación ***
  studies:[{
    type:Schema.Types.ObjectId,
    ref:'Study'
  }],    
  *** Internado de pregrado ***
  internships:[{
    type:Schema.Types.ObjectId,
    ref:'Internship'
  }],
  *** Residencias y posgrados ***
  residencies:[{
    type:Schema.Types.ObjectId,
    ref:'REsidency'
  }],
  *** Actividades docentes pasadas y presentes ***
  teachingActivities:[{
    type:Schema.Types.ObjectId,
    ref:'Activity'
  }],
  *** Activityes hospitalarias pasadas y presentes ***
  hospitalActivities:[{
    type:Schema.Types.ObjectId,
    ref:'Activity'
  }],
  *** Sociedades médicas a las que pertenece *** o usar un modelo por separado para Sociedades ***
  medicalSocieties:[{
    type:Schema.Types.ObjectId,
    ref:'Activity'
  }],
},{
  createdAt:"",
  updatedAt:""
} -->
