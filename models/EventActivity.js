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
    isOpen:{
      type:Boolean,
      default:true
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
    startTime:{
      type: String,      
    },
    endTime:{
      type: String,      
    }, 
    address:String,
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