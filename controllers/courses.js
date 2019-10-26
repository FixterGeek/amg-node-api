const Course = require("../models/Course");
const User = require("../models/User");
const Event = require("../models/Event");
const Module = require("../models/CourseModule");
const CourseActivity = require("../models/CourseActivity");
const controller = {};



controller.getCourses = async (req, res) => {
	let courses = [];	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	courses = await Course.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	.populate('modules')
	.populate({ 
		path: 'modules',
		populate: {
			path: 'activities',
			model: 'CourseActivity'
		} 
 })
	return res.status(200).json(courses)
};

controller.postCourse = async (req, res) => {
	const {speakers, location, description, permisosURLS, mainImagesURLS} = req.body
	
	if (req.body['speakers']) req.body['speakers'] = JSON.parse(speakers)
	if (req.body['location']) req.body['location'] = JSON.parse(location)
	if (req.body['description']) req.body['description'] = JSON.parse(description)
	
	if(req.body._id) delete req.body._id
	if(req.body.mainImagesURLS) delete req.body.mainImagesURLS
	if(req.body.permisosURLS) delete req.body.permisosURLS
	if(req.body.thumbnailImagesURLS) delete req.body.thumbnailImagesURLS
	if(req.body.iconImagesURLS) delete req.body.iconImagesURLS
	

	if(req.files){
		req.files.forEach(element => {
			if(req.body[`${element.fieldname}URLS`])req.body[`${element.fieldname}URLS`].push(element.secure_url)
			else req.body[`${element.fieldname}URLS`] = [element.secure_url]
		})
	}	
	const course = await Course.create(req.body);
	const event = await Event.findByIdAndUpdate(req.body.event, {$push:{courses:course._id}}, {new:true})
	res.status(201).json(course);
};

controller.addSpeaker = async (req, res) => {
	let speaker
	if(req.body._id){
		speaker = await Course.findByIdAndUpdate(req.params.id, {$pull:{speakers:req.body}}, {new:true})		
		return res.status(200).json({message:'The user was removed'})
	}else{
		if(req.files||req.file){
			req.files.forEach(element => {				
				if(req.body[`${element.fieldname}URL`])req.body[`${element.fieldname}URL`].push(element.secure_url)
				else req.body[`${element.fieldname}URL`] = [element.secure_url]		
			})
		}
		speaker = await Course.findByIdAndUpdate(req.params.id, {$push:{speakers:req.body}}, {new:true})
		speaker = speaker['speakers'][speaker['speakers'].length -1]
		return res.status(200).json(speaker)
	}
};

controller.enrollCourse = async (req, res) => {
		
	const course = await Course.findById(req.params.id)
	let enroll
	
	if(!course.students.includes(req.user._id)){		
		const user = await User.findByIdAndUpdate(req.user._id, {$push:{enrolledCourses:Course._id}}, {new:true})		
		enroll = await Course.findByIdAndUpdate(req.params.id, {$push:{students:req.user._id}}, {new:true})		
	}else{
		return res.status(400).json({message:'You are already registered'})
	}
	return res.status(200).json(enroll)
};

controller.unenrollCourse = async (req, res) => {
		
	const course = await Course.findById(req.params.id)
	let enroll
	
	if(course.students.includes(req.user._id)){		
		const user = await User.findByIdAndUpdate(req.user._id, {$pull:{enrolledCourses:Course._id}}, {new:true})		
		enroll = await Course.findByIdAndUpdate(req.params.id, {$pull:{students:req.user._id}}, {new:true})		
		return res.status(200).json(enroll)
	}else{
		return res.status(400).json({message:'Ya no eres parte, suscríbete!'})
	}	
};

controller.getCourse = async (req, res) => {  
	const course = await Course.findById(req.params.id)
	.populate('modules')
	.populate({ 
		path: 'modules',
		populate: {
			path: 'activities',
			model: 'CourseActivity'
		} 
 })
	res.status(200).json(course);
};

controller.updateCourse = async (req, res) => {
	const {speakers, location, description} = req.body
	
	if(req.body._id) delete req.body._id
	if(req.body.mainImagesURLS) delete req.body.mainImagesURLS
	if(req.body.permisosURLS) delete req.body.permisosURLS
	if(req.body.thumbnailImagesURLS) delete req.body.thumbnailImagesURLS
	if(req.body.iconImagesURLS) delete req.body.iconImagesURLS

	
	if (req.body['speakers']) req.body['speakers'] = JSON.parse(speakers)
	if (req.body['location']) req.body['location'] = JSON.parse(location)
	if (req.body['description']) req.body['description'] = JSON.parse(description)

	if(req.files || req.file){
		req.files.forEach(element => {
			if(req.body[`${element.fieldname}URLS`])req.body[`${element.fieldname}URLS`].push(element.secure_url)
			else req.body[`${element.fieldname}URLS`] = [element.secure_url]
		})
	}
	const course = await Course.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
	.populate('modules')
	.populate({ 
		path: 'modules',
		populate: {
			path: 'activities',
			model: 'CourseActivity'
		} 
 });
	res.status(200).json(course);
};

controller.deleteCourse = async (req, res) => {
	const course = await Course.findByIdAndRemove(req.params.id);
	await CourseActivity.deleteMany({Course:Course._id})
	await Module.deleteMany({Course:Course._id})
	res.status(200).json(course);
};

module.exports = controller;