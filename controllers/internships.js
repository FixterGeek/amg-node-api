const Internship = require("../models/Internship");
const controller = {};


controller.getInternships = async (req, res) => {
	let internships = [];	
	let {query, limit, skip} = req.query
	if( query || limit || skip ){
		query = JSON.parse(query)	
		internships = await User.find(query).limit(limit).skip(skip)
		return res.status(200).json(internships)
	}
	// si no hay query params mando todos
	internships = await Internship.find().limit(20).skip(0);
	res.status(200).json(internships)
};

controller.postInternship = async (req, res) => {
	const internship = await Internship.create(req.body);
	res.status(200).json(internship);
};

controller.getInternship = async (req, res) => {  
  const internship = await Internship.findById(req.params.id);  
	res.status(200).json(internship);
};

controller.updateInternship = async (req, res) => {
	const internship = await Internship.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(internship);
};

controller.deleteInternship = async (req, res) => {
	const internship = await Internship.findByIdAndRemove(req.params.id);
	res.status(200).json(internship);
};

module.exports = controller;