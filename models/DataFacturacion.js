const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dataFacturacionSchema = new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  },
  membershipSerie: String,
  membershipSerieFolio: String,
  membershipSerieDescription: String,
  eventSerie: String,
  eventSerieFolio: String,
  eventSerieDescription: String,
  privateNumber: String,
  certificate: String,
  rfc: String,
  name: String,
  regime: String,
  zipCode: String,
  cerURL: String,
  keyURL: String,
}, {
  timestamps:true
})

module.exports = mongoose.model('DataFacturacion', dataFacturacionSchema)