const CourseModule = require("../models/CourseModule");
const Course = require("../models/Course");
const controller = {};


controller.getCourseModules = async (req, res) => {
	let eCourseModules = [];	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)	
	eCourseModules = await CourseModule.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	return res.status(200).json(eCourseModules)
};

controller.postCourseModule = async (req, res) => {	
	const eCourseModule = await CourseModule.create(req.body);
	const course = await Course.findByIdAndUpdate(req.body.course,{$push:{modules:eCourseModule._id}}, {new:true})	
	res.status(201).json(eCourseModule);
};

controller.getCourseModule = async (req, res) => {  
  const eCourseModule = await CourseModule.findById(req.params.id);  
	res.status(200).json(eCourseModule);
};

controller.updateCourseModule = async (req, res) => {
	const eCourseModule = await CourseModule.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(eCourseModule);
};

controller.deleteCourseModule = async (req, res) => {
	const eCourseModule = await CourseModule.findByIdAndRemove(req.params.id);	
	const course = await Course.findByIdAndUpdate(req.body.course,{$pull:{modules:eCourseModule._id}}, {new:true})	
	res.status(200).json(eCourseModule);
};

module.exports = controller;