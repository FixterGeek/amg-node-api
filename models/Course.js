const mongoose = require('mongoose')
const Schema = mongoose.Schema


const courseSchema = new Schema({
//Datos Generales
  event:{
    type:Schema.Types.ObjectId,
    ref:'Event'
  },
  title:{
    type: String,    
  },
  cost:{
    freeCost:Number,
    residentCost:Number,
    socioCost:Number
  },
  startTime:{
    type: String,    
  },
  startDate:{
    type: String,
  },
  endDate:{
    type: String,    
  },
  description:[{
    type:String,
  }],
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

  //speakers
  speakers:[{                
      title:{
        type: String,    
      },
      fullName:{
        type: String,
      },
      photoURL:{
        type:String
      },
      city:{
        type: String,    
      },
      bio:{
        type: String,    
      },                
  }],

  modules:[{
    type:Schema.Types.ObjectId,
    ref:'CourseModule'
  }],

//Imagen
  mainImagesURLS:[{
    type: String,    
  }],
 
//Descargables //files:{  
  permisosURLS:[{
    type: String,    
  }],
  constanciasURLS:[{
    type: String,    
  }],

  //asistentes
  students:[{
    user: {
      type:Schema.Types.ObjectId,
      ref:'User'
    },
    date: String
  }],

  

  status:{
    type:String,
    enum:['draft', 'published'],
    default:'draft'
  },
  courseType:{
    type:String,
    enum:[]
  }
   
},{
  timestamps:true
})

module.exports = mongoose.model('Course', courseSchema)