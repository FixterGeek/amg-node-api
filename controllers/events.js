const Event = require("../models/Event");
const User = require("../models/User");
const Module = require("../models/Module");
const EventActivity = require("../models/EventActivity");
const controller = {};
const {assistenceToEvent} = require("../helpers/mailer")



controller.getEvents = async (req, res) => {
	let events = [];	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	events = await Event.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0).sort('-startDate')
	return res.status(200).json(events)
};

controller.postEvent = async (req, res) => {
	const {speakers, location, description, permisosURLS, mainImagesURLS, cost, constanciasURLS} = req.body
	
	if (speakers) req.body['speakers'] = JSON.parse(speakers)
	if (location) req.body['location'] = JSON.parse(location)
	if (cost) req.body['cost'] = JSON.parse(cost)
	if (description) req.body['description'] = JSON.parse(description)
	if (constanciasURLS) req.body['constanciasURLS'] = JSON.parse(constanciasURLS)
	
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
	const event = await Event.create(req.body);
	res.status(201).json(event);
};

controller.addSpeaker = async (req, res) => {
	let speaker
	if(req.body._id){
		speaker = await Event.findByIdAndUpdate(req.params.id, {$pull:{speakers:req.body}}, {new:true})
		return res.status(200).json({message:'The user was removed'})
	}else{
		if(req.files||req.file){
			req.files.forEach(element => {				
				if(req.body[`${element.fieldname}URL`])req.body[`${element.fieldname}URL`].push(element.secure_url)
				else req.body[`${element.fieldname}URL`] = [element.secure_url]		
			})
		}
		speaker = await Event.findByIdAndUpdate(req.params.id, {$push:{speakers:req.body}}, {new:true})
		speaker = speaker['speakers'][speaker['speakers'].length -1]
		return res.status(200).json(speaker)
	}
};


controller.assistEvent = async (req, res) => {
		
	const event = await Event.findById(req.params.id)
	let assist
	
	if(!event.assistants.includes(req.user._id)){		
		const user = await User.findByIdAndUpdate(req.user._id, {$push:{assistedEvents:event._id}}, {new:true})
		assist = await Event.findByIdAndUpdate(req.params.id, {$push:{assistants:{user: req.user._id, date: Date.now()}}}, {new:true})
		assistenceToEvent(user, assist)
	}else{
		return res.status(400).json({message:'You are already registered'})
	}
	return res.status(200).json(assist)
};

controller.unassistEvent = async (req, res) => {
		
	const event = await Event.findById(req.params.id)
	let assist
	
	if(event.assistants.includes(req.user._id)){		
		const user = await User.findByIdAndUpdate(req.user._id, {$pull:{assistedEvents:event._id}}, {new:true})		
		assist = await Event.findByIdAndUpdate(req.params.id, {$pull:{assistants:{user: req.user._id, date: req.query.date}}}, {new:true})		
		return res.status(200).json(assist)
	}else{
		return res.status(400).json({message:'Ya no eres parte, suscríbete!'})
	}
	
};


controller.getEvent = async (req, res) => {  
	const event = await Event.findById(req.params.id)
	.populate('modules')
	.populate({ 
		path: 'modules',
		populate: {
			path: 'activities',
			model: 'EventActivity'
		} 
 })
	res.status(200).json(event);
};

controller.updateEvent = async (req, res) => {
	const {speakers, location, description, constanciasURLS, cost} = req.body
	
	if(req.body._id) delete req.body._id
	if(req.body.mainImagesURLS) delete req.body.mainImagesURLS
	if(req.body.permisosURLS) delete req.body.permisosURLS
	if(req.body.thumbnailImagesURLS) delete req.body.thumbnailImagesURLS
	if(req.body.iconImagesURLS) delete req.body.iconImagesURLS	

	
	if (speakers) req.body['speakers'] = JSON.parse(speakers)
	if (location) req.body['location'] = JSON.parse(location)
	if (cost) req.body['cost'] = JSON.parse(cost)
	if (description) req.body['description'] = JSON.parse(description)
	if (constanciasURLS) req.body['constanciasURLS'] = JSON.parse(constanciasURLS)

	if(req.files || req.file){
		req.files.forEach(element => {
			if(req.body[`${element.fieldname}URLS`])req.body[`${element.fieldname}URLS`].push(element.secure_url)
			else req.body[`${element.fieldname}URLS`] = [element.secure_url]
		})
	}
	const event = await Event.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
	.populate('modules')
	.populate({ 
		path: 'modules',
		populate: {
			path: 'activities',
			model: 'EventActivity'
		} 
 });
	res.status(200).json(event);
};

controller.deleteEvent = async (req, res) => {
	const event = await Event.findByIdAndRemove(req.params.id);
	await EventActivity.deleteMany({event:event._id})
	await Module.deleteMany({event:event._id})
	res.status(200).json(event);
};

module.exports = controller;