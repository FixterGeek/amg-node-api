const fetch = require('node-fetch')


exports.getApiToken= async () => {
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

exports.timbrarCfdi= async (token, xml) => {
  const url = `${process.env.CONTABILIZATE_HOST}/invoices`
  const data = {
    "cfdi": xml
  }
  let response = await fetch(url,{
    method: 'POST',
    body: JSON.stringify(data),
    headers:{
      'Content-Type': 'application/json',
      'Authorization':token,
    }
  })
  let invoice = await response.json()
  return invoice;
}

exports.cancelarCfdi = async (token, data) => {
  const url = `${process.env.CONTABILIZATE_HOST}/cancel_invoice`  
  let response = await fetch(url,{
    method: 'POST', 
    body: JSON.stringify(data),   
    headers:{
      'Content-Type': 'application/json',
      'Authorization':token
    }
  })
  let invoice = await response.json()
  console.log(invoice)
  return invoice
}

exports.getFacturas = async (token) => {
  const url = `${process.env.CONTABILIZATE_HOST}/invoices`  
  let response = await fetch(url,{
    method: 'GET',    
    headers:{
      'Content-Type': 'application/json',
      'Authorization':token
    }
  })
  let invoices = await response.json()
  console.log(invoices)
  return invoices
}

exports.getFactura = async (token, invoiceId) => {
  const url = `${process.env.CONTABILIZATE_HOST}/invoice/detail/${invoiceId}`  
  let response = await fetch(url,{
    method: 'GET',    
    headers:{
      'Content-Type': 'application/json',
      'Authorization':token
    }
  })
  let invoice = await response.json()
  console.log(invoice)
  return invoice
}