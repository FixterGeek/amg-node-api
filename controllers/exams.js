const Exam = require("../models/Exam");
const controller = {};


controller.getExams = async (req, res) => {
	let exams = [];	
	let {query, limit, skip} = req.query
	if( query || limit || skip ){
		query = JSON.parse(query)	
		exams = await Exam.find(query).limit(limit).skip(skip)
		return res.status(200).json(exams)
	}
	// si no hay query params mando todos
	exams = await Exam.find().limit(20).skip(0);
	res.status(200).json(exams)
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