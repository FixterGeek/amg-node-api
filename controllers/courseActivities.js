
const CourseActivity = require("../models/CourseActivity");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseModule = require("../models/CourseModule");
const controller = {};


controller.getCourseActivities = async (req, res) => {
	let courses = [];	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	courses = await CourseActivity.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	return res.status(200).json(courses)
};

controller.postCourseActivity = async (req, res) => {

	if(req.files){
		req.files.forEach(element => {
			if(element.fieldname=='speakerPhoto')req.body['speaker'][`photoURL`] = element.secure_url
			else req.body[`${element.fieldname}URL`] = element.secure_url
		})
	}
	const course = await CourseActivity.create(req.body);
	const cModule = await CourseModule.findByIdAndUpdate(req.body.module, {$push:{activities:course._id}}, {new:true})
	res.status(201).json(course);
};

controller.enrollCourseActivity = async (req, res) => {
	
	const courseActivity = await CourseActivity.findById(req.params.id)	
	const course = await Course.findById(courseActivity.course)	
	let enroll
	
	if(!courseActivity.students.includes(req.user._id) && !course.students.includes(req.user._id)){		
		const user = await User.findByIdAndUpdate(req.user._id, {$push:{enrolledActivities:courseActivity._id,enrolledCourses:course._id}}, {new:true})
		const upCourse = await Course.findByIdAndUpdate(courseActivity.course, {$push:{students:req.user._id}}, {new:true})
		enroll = await CourseActivity.findByIdAndUpdate(req.params.id, {$push:{students:req.user._id}}, {new:true})		
	}else if(!courseActivity.students.includes(req.user._id) && course.students.includes(req.user._id)){
		const user = await User.findByIdAndUpdate(req.user._id, {$push:{enrolledActivities:courseActivity._id}}, {new:true})		
		enroll = await CourseActivity.findByIdAndUpdate(req.params.id, {$push:{students:req.user._id}}, {new:true})
	}else{
		return res.status(400).json({message:'You are already registered'})
	}

	return res.status(200).json(enroll)
};

// check
controller.unenrollCourseActivity = async (req, res) => {
	
	const courseActivity = await CourseActivity.findById(req.params.id)	
	//const course = await Course.findById(CourseActivity.Course)	
	let enroll
	
	if(courseActivity.students.includes(req.user._id)){
		const user = await User.findByIdAndUpdate(req.user._id, {$pull:{enrolledActivities:courseActivity._id}}, {new:true})
		enroll = await CourseActivity.findByIdAndUpdate(req.params.id, {$pull:{students:req.user._id}}, {new:true})
		return res.status(200).json(enroll)
	}else{
		return res.status(400).json({message:'Ya no eres parte, Suscríbete'})
	}	
};

controller.getCourseActivity = async (req, res) => {  
  const course = await CourseActivity.findById(req.params.id);  
	res.status(200).json(course);
};

controller.updateCourseActivity = async (req, res) => {
	const course = await CourseActivity.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(course);
};

controller.deleteCourseActivity = async (req, res) => {
	const course = await CourseActivity.findByIdAndRemove(req.params.id);
	const eModule = await CourseModule.findByIdAndUpdate(req.body.module, {$pull:{activities:Course._id}}, {new:true})
	
	res.status(200).json(course);
};

module.exports = controller;