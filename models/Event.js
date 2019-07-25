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

//Programa
  program:[{
    title:String,
    activities:[{
      type:Schema.Types.ObjectId,
      ref:'EventActivity'
    }]
  }],


//Mesa directiva:
  
//Imagen
  mainImagesURLS:[{
    type: String,    
  }],
  thumbnailImagesURLS:[{
    type: String,    
  }],
  iconImagesURLS:[{
    type: String,    
  }],  
//Descargables //files:{  
  permisosURLS:[{
    type: String,    
  }],
   
},{
  timestamps:true
})

module.exports = mongoose.model('Event', eventSchema)