const ExamResponse = require("../models/ExamResponse");
const controller = {};


controller.getExamResponses = async (req, res) => {
	let examResponses = [];	
	let {query, limit, skip} = req.query
	if( query || limit || skip ){
		query = JSON.parse(query)	
		examResponses = await ExamResponse.find(query).limit(limit).skip(skip)
		return res.status(200).json(examResponses)
	}
	// si no hay query params mando todos
	examResponses = await ExamResponse.find().limit(20).skip(0);
	res.status(200).json(examResponses)
};

controller.postExamResponse = async (req, res) => {
	const examResponse = await ExamResponse.create(req.body);
	res.status(200).json(examResponse);
};


controller.getExamResponse = async (req, res) => {  
  const examResponse = await ExamResponse.findById(req.params.id);  
	res.status(200).json(examResponse);
};

controller.updateExamResponse = async (req, res) => {
	const examResponse = await ExamResponse.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(examResponse);
};

controller.deleteExamResponse = async (req, res) => {
	const examResponse = await ExamResponse.findByIdAndRemove(req.params.id);
	res.status(200).json(examResponse);
};

module.exports = controller;