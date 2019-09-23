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
      'Authorization':token
    }
  })
  let invoice = await response.json()
  return invoice;
}