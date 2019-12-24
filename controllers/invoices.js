'use strict'
const Payment = require("../models/Payment");
const DataFacturacion = require("../models/DataFacturacion");
const {timbrarCfdi, getApiToken, getFacturas, getFactura, cancelarCfdi} = require('../helpers/contabilizate')
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

const cer = 'public/invoice_files/LAN7008173R5.cer.pem'
const key = 'public/invoice_files/LAN7008173R5.key.pem'

controller.getInvoices = async(req, res) => {  
  // const token = await getApiToken()
  const invoices = await getFacturas(token.token)
  return res.status(200).json(invoices);
}

controller.getInvoice = async(req, res) => {  
  // const token = await getApiToken()
  const invoice = await getFactura(token.token, req.params.id)
  return res.status(200).json(invoice);
}

controller.cancelInvoice = async(req, res) => {  
  // const token = await getApiToken()
  const data = {
    uuid: req.params.id,
    base_64_cer_pem: process.env.CER_PEM,
    base64_key_pem: process.env.KEY_PEM
  }
  const invoice = await cancelarCfdi(token.token, data)
  return res.status(200).json(invoice);
}

controller.postTaxPayer = async(req, res) => {
// const token = await getApiToken()
  const data = {
    cer_csd: "string",
    cer_fiel: "string",
    key_csd: "string",
    key_fiel: "string",
    pass_csd: "string",
    pass_fiel: "string",
    email: "string",
    name: "string",
    rfc: "string",
    regime_sat_code: "string"
  }
  const taxPayer = await cancelarCfdi(token.token, data)
  return res.status(200).json(taxPayer);

}


controller.postInvoice = async(req, res)=>{

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
  console.log('amgData :', amgData)  
  
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
  
 cfdi.cer = cer
 cfdi.key = key
 cfdi.withOutCerts = false
  
 cfdi.add(new Emisor({
   'Rfc': amgData.rfc,
   'Nombre': amgData.name,
   'RegimenFiscal': amgData.regime
 }))
  console.log('bd', basicData)
console.log('el fiscooo', fiscalData)
   
 cfdi.add(new Receptor({
   'Rfc': `${fiscalData.rfc}`,  
   'Nombre': `${basicData.name || ''} ${basicData.dadSurname || ''} ${basicData.momSurname || ''}`,
  // 'ResidenciaFiscal': 'MEX',
   // 'NumRegIdTrib': '0000000000000',
   //'UsoCFDI': 'G03'
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
  console.log({
    token:tokenRes.token,
    xml:xml
  })

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
  console.log('manual')
  const amgDataFacturacion = await DataFacturacion.find()
  const amgData = amgDataFacturacion[0]  
  const {
    address,
    amountNoIva,
    city,
    colony,
    concept,
    fullName,
    paymentMethod,
    paymentType,
    rfc,
    state,
    street,
    zipCode,
  } = req.body
  //const {paymentId} = req.params
  // njmvnmjvgfconst payment = await Payment.findById(paymentId)

  if (!amountNoIva) return res.status(400).json({message:'Sin Cantidad no podemos facturar!'})  
  //if (payment.invoice) return res.status(400).json({message:'Ya se ha facturado este pago'}) 
  if (!rfc) return res.status(400).json({message:'No es posible facturar sin tu RFC'})

  let total = amountNoIva
  let subTotal = (total / 1.16).toFixed(2).toString()
  let iva = (subTotal * .16).toFixed(2).toString()  
  
   const cfdi = new CFDI({
    'Serie':paymentType == 'Event' ? amgData.eventSerie : amgData.membershipSerie,
    'Folio': paymentType == 'Event' ? amgData.eventFolio + 1 : amgData.membershipFolio + 1,
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
    
   cfdi.cer = cer
   cfdi.key = key
   cfdi.withOutCerts = false
    
   cfdi.add(new Emisor({
     'Rfc': amgData.rfc,
     'Nombre': amgData.name,
     'RegimenFiscal': amgData.regime
   }))
      
   cfdi.add(new Receptor({
     'Rfc': rfc,  
     'Nombre': `${fullName}`,
  //    'ResidenciaFiscal': 'MEX',
  //    'NumRegIdTrib': '0000000000000',
  //    'UsoCFDI': 'G03'
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

  console.log({
    token:tokenRes.token,
    xml:xml
  })  

  timbrarCfdi(tokenRes.token, base64data)
    .then(c =>{
      if(!c.success) return res.status(400).json(c)      
      let buff = Buffer.from(c.cfdi, 'base64');
      let xmlString = buff.toString('utf8');
      //const payment = await Payment.findByIdAndUpdate(req.params.id, { $set: { invoice: xmlString} })

      return res.status(200).json({xmlString})
    })
    .catch(e=>res.json(e))  
}

module.exports = controller;
