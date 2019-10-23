'use strict'
const Payment = require("../models/Payment");
const DataFacturacion = require("../models/DataFacturacion");
const {timbrarCfdi, getApiToken} = require('../helpers/contabilizate')
const CFDI = require('cfdiv33').CFDI
const Emisor = require('cfdiv33').Emisor
const Receptor = require('cfdiv33').Receptor
const Concepto = require('cfdiv33').Concepto
const Traslado = require('cfdiv33').Traslado
// const CuentaPredial = require('cfdiv33').CuentaPredial
// const InformacionAduanera = require('cfdiv33').InformacionAduanera
// const CfdiRelacionado = require('cfdiv33').CfdiRelacionado
// const Retencion = require('cfdiv33').Retencion
const controller = {};


controller.postInvoice=async(req, res)=>{

  const amgDataFacturacion = await DataFacturacion.find()
  const amgData = amgDataFacturacion[0]
  const {basicData, fiscalData} = req.user
  const {paymentId} = req.params
  const payment = await Payment.findById(paymentId)

  if (!payment) return res.status(400).json({message:'Sin Orden no podemos facturar!'})  
  if (payment.invoice) return res.status(400).json({message:'Ya se ha facturado este pago'}) 
  if (!fiscalData.rfc) return res.status(400).json({message:'No es posible facturar sin tu RFC'})

  let total = payment.amount
  let subTotal = (total / 1.16).toFixed(2).toString()
  let iva = (subTotal * .16).toFixed(2).toString()

  console.log('payment:', payment)
  console.log('amgData :', amgData )  
  
 const cfdi = new CFDI({
  'Serie':payment.paymentType == 'Event' ? amgData.eventSerie : amgData.membershipSerie,
  'Folio': payment.paymentType == 'Event' ? amgData.eventFolio + 1 : amgData.membershipFolio + 1,
  'Fecha': new Date().toISOString().split('.')[0],
  'NoCertificado': amgData.privateNumber,
  'SubTotal': subTotal,
  'Moneda': 'MXN',
  'Total':total.toFixed(2).toString(),
  'TipoDeComprobante': 'I',
  'FormaPago': '01',
  'MetodoPago': 'PUE',
  'TipoCambio': '1',
  'LugarExpedicion': amgData.zipCode,
 });
  
 cfdi.cer = 'public/invoice_files/LAN7008173R5.cer.pem'
 cfdi.key = 'public/invoice_files/LAN7008173R5.key.pem'
 cfdi.withOutCerts = false
  
 cfdi.add(new Emisor({
   'Rfc': amgData.rfc,
   'Nombre': amgData.name,
   'RegimenFiscal': amgData.regime
 }))
    
 cfdi.add(new Receptor({
   'Rfc': 'XAXX010101000',  
  // 'Nombre': `${basicData.name || ''} ${basicData.dadSurname || ''} ${basicData.momSurname || ''}`,
  //  'ResidenciaFiscal': 'MEX',
  //  'NumRegIdTrib': '0000000000000',
   'UsoCFDI': 'G03'
 }))
    
 const concepto = new Concepto({
   'ClaveProdServ': '94101602',
   'ClaveUnidad': 'E48',
   'NoIdentificacion': '00001',
   'Cantidad': '1',
   'Unidad': 'SERVICIO',
   'Descripcion': 'MEMBRESIA',
   'ValorUnitario': subTotal,
   'Importe': subTotal
 })
    
 concepto.add(new Traslado({
   'Base': subTotal,
   'Impuesto': '002',
   'TipoFactor': 'Tasa',
   'TasaOCuota': '0.160000',
   'Importe': iva
 }))
  
  cfdi.add(concepto)
    
  cfdi.add(new Traslado({
    'Impuesto': '002',
    'TipoFactor': 'Tasa',
    'TasaOCuota': '0.160000',
    'Importe': iva
  }, {}, {
    'TotalImpuestosTrasladados':iva
  }))
  

 

  let promises = await Promise.all([getApiToken(), cfdi.getXml()])  
  const [tokenRes, xml] = promises
  let buff = Buffer.from(xml)
  let base64data = buff.toString('base64')

  timbrarCfdi(tokenRes.token, base64data)
    .then(c =>{
      if(!c.success) return res.status(400).json(c)
      console.log(c)
      let buff = Buffer.from(c.cfdi, 'base64');
      let xmlString = buff.toString('utf8');
      //const payment = await Payment.findByIdAndUpdate(req.params.id, { $set: { invoice: xmlString} })

      return res.status(200).json({xmlString})
    })
    .catch(e=>res.json(e))  
}

controller.postManualInvoice=async(req, res)=>{

  const amgDataFacturacion = await DataFacturacion.find()
  const amgData = amgDataFacturacion[0]
  const {amount, rfc, address,  paymentMethod} = req.body
  //const {paymentId} = req.params
  // njmvnmjvgfconst payment = await Payment.findById(paymentId)

  if (!amount) return res.status(400).json({message:'Sin Cantidad no podemos facturar!'})  
  //if (payment.invoice) return res.status(400).json({message:'Ya se ha facturado este pago'}) 
  if (!rfc) return res.status(400).json({message:'No es posible facturar sin tu RFC'})

  let total = amount
  let subTotal = (total / 1.16).toFixed(2).toString()
  let iva = (subTotal * .16).toFixed(2).toString()

  console.log('payment:', payment)
  console.log('amgData :', amgData )  
  
 const cfdi = new CFDI({
  'Serie':payment.paymentType == 'Event' ? amgData.eventSerie : amgData.membershipSerie,
  'Folio': payment.paymentType == 'Event' ? amgData.eventFolio + 1 : amgData.membershipFolio + 1,
  'Fecha': new Date().toISOString().split('.')[0],
  'NoCertificado': amgData.privateNumber,
  'SubTotal': subTotal,
  'Moneda': 'MXN',
  'Total':total.toFixed(2).toString(),
  'TipoDeComprobante': 'I',
  'FormaPago': '01',
  'MetodoPago': paymentMethod || 'PUE',
  'TipoCambio': '1',
  'LugarExpedicion': amgData.zipCode,
 });
  
 cfdi.cer = 'public/invoice_files/LAN7008173R5.cer.pem'
 cfdi.key = 'public/invoice_files/LAN7008173R5.key.pem'
 cfdi.withOutCerts = false
  
 cfdi.add(new Emisor({
   'Rfc': amgData.rfc,
   'Nombre': amgData.name,
   'RegimenFiscal': amgData.regime
 }))
    
 cfdi.add(new Receptor({
   'Rfc': 'XAXX010101000',  
  // 'Nombre': `${basicData.name || ''} ${basicData.dadSurname || ''} ${basicData.momSurname || ''}`,
  //  'ResidenciaFiscal': 'MEX',
  //  'NumRegIdTrib': '0000000000000',
   'UsoCFDI': 'G03'
 }))
    
 const concepto = new Concepto({
   'ClaveProdServ': '94101602',
   'ClaveUnidad': 'E48',
   'NoIdentificacion': '00001',
   'Cantidad': '1',
   'Unidad': 'SERVICIO',
   'Descripcion': 'MEMBRESIA',
   'ValorUnitario': subTotal,
   'Importe': subTotal
 })
    
 concepto.add(new Traslado({
   'Base': subTotal,
   'Impuesto': '002',
   'TipoFactor': 'Tasa',
   'TasaOCuota': '0.160000',
   'Importe': iva
 }))
  
  cfdi.add(concepto)
    
  cfdi.add(new Traslado({
    'Impuesto': '002',
    'TipoFactor': 'Tasa',
    'TasaOCuota': '0.160000',
    'Importe': iva
  }, {}, {
    'TotalImpuestosTrasladados':iva
  }))
  

 

  let promises = await Promise.all([getApiToken(), cfdi.getXml()])  
  const [tokenRes, xml] = promises
  let buff = Buffer.from(xml)
  let base64data = buff.toString('base64')

  timbrarCfdi(tokenRes.token, base64data)
    .then(c =>{
      if(!c.success) return res.status(400).json(c)
      console.log(c)
      let buff = Buffer.from(c.cfdi, 'base64');
      let xmlString = buff.toString('utf8');
      //const payment = await Payment.findByIdAndUpdate(req.params.id, { $set: { invoice: xmlString} })

      return res.status(200).json({xmlString})
    })
    .catch(e=>res.json(e))  
}



module.exports = controller;


