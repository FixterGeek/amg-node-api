const Filial = require("../models/Filial");
const controller = {};


controller.getFiliales = async (req, res) => {
	let filiales = [];	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	filiales = await Filial.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0).populate('administrators')
	return res.status(200).json(filiales)
};

controller.postFilial = async (req, res) => {
	let filial = await Filial.create(req.body)
	res.status(201).json(filial);
};

controller.getFilial = async (req, res) => {
  const filial = await Filial.findById(req.params.id).populate('administrators')
	res.status(200).json(filial);
};

controller.updateFilial = async (req, res) => {
	const filial = await Filial.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
	res.status(200).json(filial);
};

controller.deleteFilial = async (req, res) => {
	const filial = await Filial.findByIdAndRemove(req.params.id)
	res.status(200).json(filial);
};

module.exports = controller;