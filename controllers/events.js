const Event = require("../models/Event");
const controller = {};


controller.getEvents = async (req, res) => {
	let events = [];	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	events = await Event .find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	return res.status(200).json(events)
};

controller.postEvent = async (req, res) => {
	const {speakers, location} = req.body
	req.body['speakers'] = JSON.parse(speakers)
	req.body['location'] = JSON.parse(location)

	if(req.files){
		req.files.forEach(element => {
			if(req.body[`${element.fieldname}URLS`])req.body[`${element.fieldname}URLS`].push(element.secure_url)
			else req.body[`${element.fieldname}URLS`] = [element.secure_url]
		})
	}
	const event = await Event.create(req.body);
	res.status(200).json(event);
};

controller.assistEvent = async (req, res) => {
  const event = await Event.findOne({_id:req.params.id,assistants:{$in:[req.user._id]}})  
  let assist
  if(event==null){
    assist = await Event.findByIdAndUpdate({_id:req.params.id}, {$push:{assistants:req.user._id}}, {new:true})
    return res.status(200).json(assist)
  }else{
    assist = await Event.findByIdAndUpdate({_id:req.params.id}, {$pull:{assistants:req.user._id}}, {new:true})
    return res.status(200).json(assist)
  }	
};


controller.getEvent = async (req, res) => {  
  const event = await Event.findById(req.params.id);  
	res.status(200).json(event);
};

controller.updateEvent = async (req, res) => {
	const event = await Event.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(event);
};

controller.deleteEvent = async (req, res) => {
	const event = await Event.findByIdAndRemove(req.params.id);
	res.status(200).json(event);
};

module.exports = controller;