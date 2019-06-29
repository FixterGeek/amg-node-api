const Institution = require("../models/Institution");
const controller = {};


controller.getInstitutions = async (req, res) => {
	let institutions = [];	
	let {query, limit, skip} = req.query
	if( query || limit || skip ){
		query = JSON.parse(query)	
		institutions = await User.find(query).limit(limit).skip(skip)
		return res.status(200).json(institutions)
	}
	// si no hay query params mando todos
	institutions = await Institution.find().limit(20).skip(0);
	res.status(200).json(institutions)
};

controller.postInstitution = async (req, res) => {
	const institution = await Institution.create(req.body);
	res.status(200).json(institution);
};

controller.getInstitution = async (req, res) => {  
  const institution = await Institution.findById(req.params.id);  
	res.status(200).json(institution);
};

controller.updateInstitution = async (req, res) => {
	const institution = await Institution.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(institution);
};

controller.deleteInstitution = async (req, res) => {
	const institution = await Institution.findByIdAndRemove(req.params.id);
	res.status(200).json(institution);
};

module.exports = controller;