const Residence = require("../models/Residence");
const controller = {};


controller.getResidences = async (req, res) => {
	let residences = [];	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	residences = await Residence.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0).populate('institution')
	return res.status(200).json(residences)
};

controller.postResidence = async (req, res) => {
	if(req.file||req.files){		
		req.files.forEach(element => {
			if(req.body[`${element.fieldname}URLS`])req.body[`${element.fieldname}URLS`].push(element.secure_url)
			else req.body[`${element.fieldname}URLS`] = [element.secure_url]
		})
	}
	const residence = await Residence.create(req.body);
	res.status(201).json(residence);
};

controller.getResidence = async (req, res) => {  
  const residence = await Residence.findById(req.params.id).populate('institution');
	res.status(200).json(residence);
};

controller.updateResidence = async (req, res) => {
	if(req.file||req.files){		
		req.files.forEach(element => {
			if(req.body[`${element.fieldname}URLS`])req.body[`${element.fieldname}URLS`].push(element.secure_url)
			else req.body[`${element.fieldname}URLS`] = [element.secure_url]
		})
	}
	const residence = await Residence.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(residence);
};

controller.deleteResidence = async (req, res) => {
	const residence = await Residence.findByIdAndRemove(req.params.id);
	res.status(200).json(residence);
};

module.exports = controller;