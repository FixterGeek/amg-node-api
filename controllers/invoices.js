'use strict'
const Payment = require("../models/Payment");
const controller = {};

var fetch = require('node-fetch')

const CFDI = require('cfdiv33').CFDI
const Emisor = require('cfdiv33').Emisor
const Receptor = require('cfdiv33').Receptor
const Concepto = require('cfdiv33').Concepto
const CuentaPredial = require('cfdiv33').CuentaPredial
const InformacionAduanera = require('cfdiv33').InformacionAduanera
const CfdiRelacionado = require('cfdiv33').CfdiRelacionado
const Traslado = require('cfdiv33').Traslado
const Retencion = require('cfdiv33').Retencion

const getApiToken= async () => {
  const url = `${process.env.CONTABILIZATE_HOST}/authenticate`
  const data = {
    "email": process.env.CONTABILIZATE_EMAIL,
    "password": process.env.CONTABILIZATE_PASS
  }

  let response = await fetch(url,{
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json'
    }
  })
  let token = await response.json()
  return token;
}

const generateCFDI= async (token, xml) => {
  const url = `${process.env.CONTABILIZATE_HOST}/invoices`
  const data = {
    "cfdi": xml
  }
  let response = await fetch(url,{
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json',
      'Authorization':token
    }
  })
  let invoice = await response.json()
  return invoice;

}

controller.postInvoice=async(req, res)=>{

  const cfdi = new CFDI({
    //'Serie': 'A',
    'Folio': '367ABA',
    'Fecha': '2019-09-19T08:09:23',
    'NoCertificado': '20001000000300022815',
    'SubTotal': '1000',
    'Moneda': 'MXN',
    'Total': '1160',
    'TipoDeComprobante': 'I',
    'FormaPago': '01',
    'MetodoPago': 'PUE',
    //'CondicionesDePago': 'CONDICIONES',
    'TipoCambio': '1',
    'LugarExpedicion': '45079',
  });
  
  cfdi.cer = 'public/invoice_files/LAN7008173R5.cer.pem'
  cfdi.key = 'public/invoice_files/LAN7008173R5.key.pem'
  cfdi.withOutCerts = false
  
  /*
  cfdi.add(new CfdiRelacionado({
    'UUID': 'A39DA66B-52CA-49E3-879B-5C05185B0EF7'
  }, {
    'TipoRelacion': '01'
  }))
  */
  
  
 cfdi.add(new Emisor({
  'Rfc': 'LAN7008173R5',
  'Nombre': 'CESAR RENE AGUILERA ARREOLA',
  'RegimenFiscal': '601'
}))

cfdi.add(new Receptor({
  'Rfc': 'HEPR930322977',
  //'Nombre': 'RAFAEL ALEJANDRO HERNÁNDEZ PALACIOS',
  //'ResidenciaFiscal': 'MEX',
  //'NumRegIdTrib': '0000000000000',
  'UsoCFDI': 'G01'
}))

const concepto = new Concepto({
  'ClaveProdServ': '01010101',
  'ClaveUnidad': 'F52',
  'NoIdentificacion': '00001',
  'Cantidad': '1',
  'Unidad': 'TONELADA',
  'Descripcion': 'ACERO',
  'ValorUnitario': '1000',
  'Importe': '1000'
})

concepto.add(new Traslado({
  'Base': '1000.00',
  'Impuesto': '002',
  'TipoFactor': 'Tasa',
  'TasaOCuota': '0.160000',
  'Importe': '160.00'
}))

cfdi.add(concepto)

cfdi.add(new Traslado({
  'Impuesto': '002',
  'TipoFactor': 'Tasa',
  'TasaOCuota': '0.160000',  
  'Importe': '160.00'
}, {}, {
  'TotalImpuestosTrasladados': '160.00'
}))
  
  let promises = await Promise.all([getApiToken(), cfdi.getXml()])

  const [tokenRes, xml] = promises
  let buff = Buffer.from(xml);
  let base64data = buff.toString('base64');

  generateCFDI(tokenRes.token, base64data)
    .then(c=>{
      let buff = Buffer.from(c.cfdi, 'base64');
      let xmlString = buff.toString('utf8');
      return res.json(xmlString)
    })
    .catch(e=>res.json(e))
  

}

module.exports = controller;



