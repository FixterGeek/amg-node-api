const Internship = require("../models/Internship");
const User = require("../models/User");
const controller = {};


controller.getInternships = async (req, res) => {
	let internships = [];	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	internships = await Internship.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0).populate('institution')
	return res.status(200).json(internships)
};

controller.postInternship = async (req, res) => {
	let internship = await Internship.create(req.body);
	internship = await Internship.findById(internship._id).populate('institution');	
	const user = await User.findByIdAndUpdate(req.body.user,{$push:{internships:internship._id}}, {new:true})		
	res.status(201).json(internship);
};

controller.getInternship = async (req, res) => {  
  const internship = await Internship.findById(req.params.id).populate('institution');
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