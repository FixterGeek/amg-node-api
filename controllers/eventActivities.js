
const EventActivity = require("../models/EventActivity");
const Event = require("../models/Event");
const User = require("../models/User");
const Module = require("../models/Module");
const controller = {};


controller.getActivityEvents = async (req, res) => {
	let events = [];
	console.log(req.query)	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	events = await EventActivity.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	return res.status(200).json(events)
};

controller.postActivityEvent = async (req, res) => {

	if(req.files){
		req.files.forEach(element => {
			if(element.fieldname=='speakerPhoto')req.body['speaker'][`photoURL`] = element.secure_url
			else req.body[`${element.fieldname}URL`] = element.secure_url
		})
	}
	const event = await EventActivity.create(req.body);
	const eModule = await Module.findByIdAndUpdate(req.body.module, {$push:{activities:event._id}}, {new:true})
	res.status(201).json(event);
};

controller.assistActivityEvent = async (req, res) => {
	
	const eventActivity = await EventActivity.findById(req.params.id)	
	const event = await Event.findById(eventActivity.event)	
	let assist
	
	if(!eventActivity.assistants.includes(req.user._id) && !event.assistants.includes(req.user._id)){		
		const user = await User.findByIdAndUpdate(req.user._id, {$push:{assistedActivities:eventActivity._id,assistedEvents:event._id}}, {new:true})
		const upEvent = await Event.findByIdAndUpdate(eventActivity.event, {$push:{assistants:req.user._id}}, {new:true})
		assist = await EventActivity.findByIdAndUpdate(req.params.id, {$push:{assistants:req.user._id}}, {new:true})		
	}else if(!eventActivity.assistants.includes(req.user._id) && event.assistants.includes(req.user._id)){
		const user = await User.findByIdAndUpdate(req.user._id, {$push:{assistedActivities:eventActivity._id}}, {new:true})		
		assist = await EventActivity.findByIdAndUpdate(req.params.id, {$push:{assistants:req.user._id}}, {new:true})
	}else{
		return res.status(400).json({message:'You are already registered'})
	}

	return res.status(200).json(assist)
};

// check
controller.unassistActivityEvent = async (req, res) => {
	
	const eventActivity = await EventActivity.findById(req.params.id)	
	//const event = await Event.findById(eventActivity.event)	
	let assist
	
	if(eventActivity.assistants.includes(req.user._id)){
		const user = await User.findByIdAndUpdate(req.user._id, {$pull:{assistedActivities:eventActivity._id}}, {new:true})
		assist = await EventActivity.findByIdAndUpdate(req.params.id, {$pull:{assistants:req.user._id}}, {new:true})
		return res.status(200).json(assist)
	}else{
		return res.status(400).json({message:'Ya no eres parte, Suscríbete'})
	}
	
};



controller.getActivityEvent = async (req, res) => {  
  const event = await EveEventActivitynt.findById(req.params.id);  
	res.status(200).json(event);
};

controller.updateActivityEvent = async (req, res) => {
	const event = await EventActivity.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(event);
};

controller.deleteActivityEvent = async (req, res) => {
	const event = await EventActivity.findByIdAndRemove(req.params.id);
	const eModule = await Module.findByIdAndUpdate(req.body.module, {$pull:{activities:event._id}}, {new:true})
	
	res.status(200).json(event);
};

module.exports = controller;