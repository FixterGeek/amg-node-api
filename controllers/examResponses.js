const ExamResponse = require("../models/ExamResponse");
const controller = {};


controller.getExamResponses = async (req, res) => {
	let responses = [];	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	responses = await ExamResponse.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	return res.status(200).json(responses)
};

controller.postExamResponse = async (req, res) => {
	const examResponse = await ExamResponse.create(req.body);
	res.status(201).json(examResponse);
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