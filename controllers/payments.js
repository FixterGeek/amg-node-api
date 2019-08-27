const User = require('../models/User')
const Payment = require('../models/Payment')
const conekta = require('conekta')
const controller = {};




conekta.api_key = process.env.CONEKTA_KEY
conekta.api_version = '2.0.0';
conekta.locale = 'es'



controller.subscription = async (req, res) => {
  const { conektaToken, plazo = "contado", phone, price } = req.body
  const { user } = req

  const chargeObj = {
    payment_method: {
      type: "card",
      token_id: conektaToken,
    },

  };

  //if (plazo !== "contado") chargeObj.payment_method.monthly_installments = parseInt(plazo);
  const conektaObject =
  {
    currency: "MXN",
    customer_info: {
      name: user.username,
      phone: user.basicData.phone || phone,
      email: user.email,
    },
    line_items: [
      {
        name: "AMG Subscription",
        unit_price: price * 100,
        quantity: 1,
      }
    ],
    charges: [chargeObj]
  }
  conekta.Order.create(
    conektaObject,
    async function (err, order) {
      if (err) {
        console.log('conektaerror', err)
        return res.status(400).json(err);
      }

      const payment = await Payment.create({
        user: user._id,
        conektaId: order.id,
        date: order.created_at,
        amount: order.amount,
        paid: true,
        paymentType: 'Subscription'
      })
      await User.findByIdAndUpdate(user._id, { $push: { renewals: payment._id } }, { new: true })
      return res.status(200).json(payment)
    }
  );

}


controller.eventPayment = async (req, res) => {
  const { conektaToken, plazo = "contado", phone, price } = req.body
  const { user } = req

  const chargeObj = {
    payment_method: {
      type: "card",
      token_id: conektaToken,
    },

  };

  //if (plazo !== "contado") chargeObj.payment_method.monthly_installments = parseInt(plazo);
  const conektaObject =
  {
    currency: "MXN",
    customer_info: {
      name: user.username,
      phone: user.basicData.phone || phone,
      email: user.email,
    },
    line_items: [
      {
        name: "Event payment",
        unit_price: price * 100,
        quantity: 1,
      }
    ],
    charges: [chargeObj]
  }
  conekta.Order.create(
    conektaObject,
    async function (err, order) {
      if (err) {
        console.log('conektaerror', err)
        return res.status(400).json(err);
      }

      const payment = await Payment.create({
        user: user._id,
        conektaId: order.id,
        date: order.created_at,
        amount: order.amount,
        paid: true,
        paymentType: 'Event'
      })
      await User.findByIdAndUpdate(user._id, { $push: { eventOrders: payment._id } }, { new: true })
      return res.status(200).json(payment)
    }
  );

}


controller.getPayments = async (req, res) => {
  let payments = [];
  console.log(req.query)
  let { query, limit, skip } = req.query
  if (query) query = JSON.parse(query)
  // si no hay query params mando todos
  payments = await Payment.find(query || {}).limit(Number(limit) || 0).skip(Number(skip) || 0)
  return res.status(200).json(payments)
};





module.exports = controller;


