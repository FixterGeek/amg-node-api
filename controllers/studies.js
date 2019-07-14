const Study = require("../models/Study");
const controller = {};


controller.getStudies = async (req, res) => {
	let Studys = [];	
	let {query, limit, skip} = req.query
	if( query || limit || skip ){
		query = JSON.parse(query)	
		Studys = await Study.find(query).limit(limit).skip(skip)
		return res.status(200).json(Studys)
	}
	// si no hay query params mando todos
	studies = await Study.find().limit(20).skip(0);
	res.status(200).json(studies)
};

controller.postStudy = async (req, res) => {
	const study = await Study.create(req.body);
	res.status(200).json(study);
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