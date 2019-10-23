const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseAcitivitySchema = new Schema({  

    course:{
      type:Schema.Types.ObjectId,
      ref:'Course'
    },
    module:{
      type:Schema.Types.ObjectId,
      ref:'CourseModule'
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
    students:[{
      type:Schema.Types.ObjectId,
      ref:'User'
    }]
  
},{
  timestamps:true
})

module.exports = mongoose.model('CourseActivity', courseAcitivitySchema)