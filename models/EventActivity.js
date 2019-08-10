const mongoose = require('mongoose')
const Schema = mongoose.Schema

const acitivitySchema = new Schema({  

    event:{
      type:Schema.Types.ObjectId,
      ref:'Event'
    },
    module:{
      type:Schema.Types.ObjectId,
      ref:'Module'
    },
    activityName:{
      type: String,      
    },
    activityType:{
      type: String, 
      enum:['Actividad', 'Conferencia', 'Taller', 'Otro']     
    },
    description:{
      type:String
    },
    cost:{
      type: Number,    
    },
    date:{
      type: String,      
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
    constanciaURL:{
      type: String,    
    },
    speakers:[{      
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
        title:{
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
    }],
    amgSpeaker:{
      type:Schema.Types.ObjectId,
      ref:'User'
    },   
    speaker:{
      professionalTitle:{
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
    },
     //asistentes
    assistants:[{
      type:Schema.Types.ObjectId,
      ref:'User'
    }]
  
},{
  timestamps:true
})

module.exports = mongoose.model('EventActivity', acitivitySchema)