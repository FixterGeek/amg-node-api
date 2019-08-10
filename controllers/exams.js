const Exam = require("../models/Exam");
const controller = {};


controller.getExams = async (req, res) => {
	let exams = [];
	console.log(req.query)	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	exams = await Exam.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	return res.status(200).json(exams)
};

controller.postExam = async (req, res) => {
	const exam = await Exam.create(req.body);
	res.status(200).json(exam);
};


controller.getExam = async (req, res) => {  
  const exam = await Exam.findById(req.params.id);  
	res.status(200).json(exam);
};

controller.updateExam = async (req, res) => {
	const exam = await Exam.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(exam);
};

controller.deleteExam = async (req, res) => {
	const exam = await Exam.findByIdAndRemove(req.params.id);
	res.status(200).json(exam);
};

module.exports = controller;