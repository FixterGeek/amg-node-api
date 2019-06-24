const mongoose = require('mongoose')
const Schema = mongoose.Schema

const institutionSchema = new Schema({
  // si aplica, 
  owner:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  name:{
    type:String,
    required:true
  },
  president:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true,
    enum:['Hospital', 'Escuela', 'Consultorio', 'Sociedad']
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
  phones:[{
    type:Number
  }],
  email:{
    type:String,    
  },
  logoURL:{
    type:String
  }
  // celular:{
  //   type:String,
//   
  // },
  
},{
  timestamps:true
})

module.exports = mongoose.model('Institution', institutionSchema) 
