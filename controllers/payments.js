const User = require('../models/User')
const Payment = require('../models/Payment')
const Event = require('../models/Event')
const Course = require('../models/Course')
const conekta = require('conekta')
const controller = {};




conekta.api_key = process.env.CONEKTA_PRIVATE_KEY
conekta.api_version = '2.0.0';
conekta.locale = 'es'



controller.subscription = async (req, res) => {
  const { conektaToken, price, subscriptionType, phone, plazo="contado", isOxxoPayment=false} = req.body
  const { user } = req

  const chargeObj = {
    payment_method: {
      type: "oxxo_cash",
    }
  };
  
  if (!isOxxoPayment){
    chargeObj['payment_method'] = {
      type: "card",
      token_id: conektaToken.id
    }
  }
  

  //if (plazo !== "contado") chargeObj.payment_method.monthly_installments = parseInt(plazo);
  const conektaObject =
  {
    currency: "MXN",
    customer_info: {
      name: `${user.name} ${user.dadSurname} ${user.momSurname}`,
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
        concept:`Suscripción ${subscriptionType}`,
        conektaId: order.toObject().id,
        date: req.body.date ||order.toObject().created_at,
        amount: order.toObject().amount/100,
        paid: true,
        paymentType: 'Subscription',        
      })
      await User.findByIdAndUpdate(user._id, { $push: { renewals: payment._id } }, { new: true })
      return res.status(200).json({payment, conektaOrder:order._json})
    }
  );

}

controller.eventPayment = async (req, res) => {
  const { conektaToken, eventId, phone, plazo="contado", isOxxoPayment=false} = req.body
  const { user } = req
  const event = await Event.findById(eventId)
  let eventCost = event.cost.socioCost;
  
  if(user.membershipStatus == 'Free') eventCost = event.cost.freeCost
  if(user.membershipStatus == 'Residente') eventCost = event.cost.residentCost
  if(user.membershipStatus == 'Socio') eventCost = event.cost.socioCost

  const chargeObj = {
    payment_method: {
      type: "oxxo_cash",
    }
  };
  
  if (!isOxxoPayment){
    chargeObj['payment_method'] = {
      type: "card",
      token_id: conektaToken.id
    }
  }

  //if (plazo !== "contado") chargeObj.payment_method.monthly_installments = parseInt(plazo);
  const conektaObject =
  {
    currency: "MXN",
    customer_info: {
      name: `${user.basicData.name} ${user.basicData.dadSurname} ${user.basicData.momSurname}`,
      phone: user.basicData.phone || phone,
      email: user.email,
    },
    line_items: [
      {
        name: "Event payment",
        unit_price: eventCost * 100,
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
        concept:event.title,
        conektaId: order.toObject().id,
        date: req.body.date ||order.toObject().created_at,
        amount: order.toObject().amount,
        paid: true,
        paymentType: 'Event'        
      })
      await User.findByIdAndUpdate(user._id, { $push: { eventOrders: payment._id } }, { new: true })
      return res.status(200).json({payment, conektaOrder:order._json})
    }
  );

}

controller.coursePayment = async (req, res) => {
  const { conektaToken, courseIds, phone, plazo="contado", isOxxoPayment=false} = req.body  
  const { user } = req
  const courses = await Course.find({_id:{$in: courseIds}})
  const coursesCost = courses.reduce((acc, course)=>{
    let courseCost
    if(user.membershipStatus == 'Free') courseCost = course.cost.freeCost
    if(user.membershipStatus == 'Residente') courseCost = course.cost.residentCost
    if(user.membershipStatus == 'Socio') courseCost = course.cost.socioCost    
    return acc + courseCost    
  }, 0)
  const chargeObj = {
    payment_method: {
      type: "oxxo_cash",
    }
  };
  
  if (!isOxxoPayment){
    chargeObj['payment_method'] = {
      type: "card",
      token_id: conektaToken.id
    }
  }

  //if (plazo !== "contado") chargeObj.payment_method.monthly_installments = parseInt(plazo);
  const conektaObject =
  {
    currency: "MXN",
    customer_info: {
      name: `${user.basicData.name} ${user.basicData.dadSurname} ${user.basicData.momSurname}`,
      phone: user.basicData.phone || phone,
      email: user.email,
    },
    line_items: [
      {
        name: "course payment",
        unit_price: coursesCost * 100,
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
        concept:`${courses.length} Cursos`,
        conektaId: order.toObject().id,
        date: req.body.date ||order.toObject().created_at,
        amount: order.toObject().amount,
        paid: true,
        paymentType: 'Course'        
      })
      await User.findByIdAndUpdate(user._id, { $push: { courseOrders: payment._id } }, { new: true })
      return res.status(200).json({payment, conektaOrder:order._json})
    }
  );

}


controller.getPayments = async (req, res) => {
  let payments = [];
  console.log(req.query)
  let { query, limit, skip } = req.query
  if (query) query = JSON.parse(query)
  // si no hay query params mando todos
  payments = await Payment.find(query || {}).limit(Number(limit) || 0).skip(Number(skip) || 0).populate('users').populate('filial')
  return res.status(200).json(payments)
};

controller.postPayment = async (req, res) => {
  const {userId, filialId} = req.body
  if(req.file || req.files) req.body['recipetURL'] = req.file.secure_url || req.file.url  
  const payment = await Payment.create(req.body)
  await User.findByIdAndUpdate(userId, { $push: { renewals: payment._id } }, { new: true })
  if (filialId) await Filial.findByIdAndUpdate(filialId, { $push: { payments: payment._id } }, { new: true })
  return res.status(200).json(payment)
};

controller.getPayment = async (req, res) => {
	const payment = await Payment.findById(req.params.id);
	res.status(200).json(payment);
};

controller.updatePayment = async (req, res) => {
  if(req.file || req.files) req.body['recipetURL'] = req.file.secure_url || req.file.url
	const payment = await Payment.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
	res.status(200).json(payment);
};

controller.deletePayment = async (req, res) => {
	const payment = await Payment.findByIdAndRemove(req.params.id);
	res.status(200).json(payment);
};





module.exports = controller;


