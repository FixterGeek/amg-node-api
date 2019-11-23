const Module = require("../models/Module");
const Event = require("../models/Event");
const controller = {};


controller.getModules = async (req, res) => {
	let eModules = [];	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	eModules = await Module.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	return res.status(200).json(eModules)
};

controller.postModule = async (req, res) => {	
	const eModule = await Module.create(req.body);
	const event = await Event.findByIdAndUpdate(req.body.event,{$push:{modules:eModule._id}}, {new:true})	
	res.status(201).json(eModule);
};


controller.getModule = async (req, res) => {  
  const eModule = await Module.findById(req.params.id);  
	res.status(200).json(eModule);
};

controller.updateModule = async (req, res) => {
	const eModule = await Module.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(eModule);
};

controller.deleteModule = async (req, res) => {
	const eModule = await Module.findByIdAndRemove(req.params.id);	
	const event = await Event.findByIdAndUpdate(req.body.event,{$pull:{modules:eModule._id}}, {new:true})	
	res.status(200).json(eModule);
};

module.exports = controller;