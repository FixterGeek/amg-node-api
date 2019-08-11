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
    limit:Number,
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
    speakers:[],
    
     //asistentes
    assistants:[{
      type:Schema.Types.ObjectId,
      ref:'User'
    }]
  
},{
  timestamps:true
})

module.exports = mongoose.model('EventActivity', acitivitySchema)