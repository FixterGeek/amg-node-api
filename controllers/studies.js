const Study = require("../models/Study");
const User = require("../models/User");
const controller = {};


controller.getStudies = async (req, res) => {
	let studies = [];
	console.log(req.query)	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	studies = await Study.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	return res.status(200).json(studies)
};

controller.postStudy = async (req, res) => {
	const study = await Study.create(req.body);
	const user = await User.findByIdAndUpdate(req.body.user,{$push:{studies:study._id}}, {new:true})		
	res.status(201).json(study);
};

controller.getStudy = async (req, res) => {  
  const study = await Study.findById(req.params.id);  
	res.status(200).json(study);
};

controller.updateStudy = async (req, res) => {
	const study = await Study.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(study);
};

controller.deleteStudy = async (req, res) => {
	const study = await Study.findByIdAndRemove(req.params.id);
	res.status(200).json(study);
};

module.exports = controller;