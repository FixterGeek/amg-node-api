const mongoose = require('mongoose')
const Schema = mongoose.Schema

const filialSchema = new Schema({
  state: {
    type: String,
    unique: true,
    required: true
  },
  payments:[{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  users:[{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
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
  bankData:{
    accountNumber:String,
    bank:String,
    CLABE:String
  },
  users:[{
    type:Schema.Types.ObjectId,
    ref:'Filial'
  }],
  administrators:[{
    type:Schema.Types.ObjectId,
    ref:'Filial'
  }]
},{
  timestamps: true
})

module.exports = mongoose.model('Filial', filialSchema)