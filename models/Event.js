const mongoose = require('mongoose')
const Schema = mongoose.Schema


const eventSchema = new Schema({
//Datos Generales
  title:{
    type: String,    
  },
  startDate:{
    type: String,    
  },
  endDate:{
    type: String,    
  },
  curricularValue:{
    type: String,    
  },
  curricularRegistrationNumber:{//numero de registro curricular al que pertenece:
    type: String,    
  },
  curricularInstitution:{//institución que otorga valor curricular:{
    type: String,    
  },
  directedTo:{ //tags de especialidades //dirigidoA
    type: String,    
  },
  cost:{
    type: Number,    
  },
  contact:{
    type: String,    
  },

//Ubicación
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

//Programa
  program:[{    
    activityName:{
      type: String,      
    },
    activityType:{
      type: String,      
    },
    date:{
      type: String,      
    },    
    place:{
      type: String,      
    },
    speaker:{
      title:{
        type: String,    
      },
      fullName:{
        type: String,    
      },
      photoURL:{
        type:String
      },
      origin:{
        type: String,    
      },
      bio:{
        type: String,    
      },
      profileURL:{ 
        type: String,    
      },
      activities:{ 
        type: String,    
      },     
    },
    coordinator:{
      type: String,      
    },
    participant:{
      type: String,      
    },
    module:{
      type: String,      
    },
    moduleTitle:{
      type: String,      
    },
    moduleCoordinator:{
      type: String,      
    },
  }],

//ivote
  tituloActividad:{
    type: String,    
  },
  crearCuestionario:{ //???:{
    type: String,    
  },
//Speaker
  // speakerTitle:{
  //   type: String,    
  // },
  // completeName:{
  //   type: String,    
  // },
  // origin:{
  //   type: String,    
  // },
  // bio:{
  //   type: String,    
  // },
  // profileURL:{ 
  //   type: String,    
  // },
  // activities:{ 
  //   type: String,    
  // },

//Directorio
//Mesa directiva:
  president:{
    type: Schema.Types.ObjectId,
    ref:'User',    
  },
  vicepresident:{
    type: Schema.Types.ObjectId,
    ref:'User',    
  },
  secretary:{
    type: Schema.Types.ObjectId,
    ref:'User',    
  },
  treasurer:{
    type: Schema.Types.ObjectId,
    ref:'User',    
  },
  protreasurer:{
    type: Schema.Types.ObjectId,
    ref:'User',    
  },
  proceedingsSecretary:{
    type: Schema.Types.ObjectId,
    ref:'User',    
  },
  relationsSecretary:{
    type: Schema.Types.ObjectId,
    ref:'User',    
  },
//Consejo Consultivo:{

  consultiveDirectors:[{ // [personas]
    type: Schema.Types.ObjectId,
    ref:'User',    
  }],
//Directores de Curso:{
  
  courseDirector:{
    type: Schema.Types.ObjectId,
    ref:'User',    
  },
//Cordinador General:{
  
  generalCoordinator:{
    type: Schema.Types.ObjectId,
    ref:'User',  
  },
//Asociaciones participantes
  participationAsosiations:[{    
      type: Schema.Types.ObjectId,
      ref:'Institucion',     
  }],
  
  
//Imagen
  photoURL:{
    type: String,    
  },
  logosInstituciones:[{
      type: String 
    }],
//Descargables //files:{
  
  permisoURL:{
    type: String,    
  },
  constanciaURL:{
    type: String,    
  },
  programaURL :{
    type: String,    
  },
},{
  timestamps:true
})

module.exports = mongoose.model('Event', eventSchema)