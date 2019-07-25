
const EventActivity = require("../models/EventActivity");
const controller = {};


controller.getEvents = async (req, res) => {
	let events = [];	
	let {query, limit, skip} = req.query
	if( query || limit || skip ){
		query = JSON.parse(query)	
		events = await EventActivity.find(query).limit(limit).skip(skip)
		return res.status(200).json(events)
	}
	// si no hay query params mando todos
	events = await EventActivity.find().limit(20).skip(0);
	res.status(200).json(events)
};

controller.postEvent = async (req, res) => {

	if(req.files){
		req.files.forEach(element => {
			if(element.fieldname=='speakerPhoto')req.body['speaker'][`photoURL`] = element.secure_url
			else req.body[`${element.fieldname}URL`] = element.secure_url
		})
	}
	const event = await EventActivity.create(req.body);
	res.status(200).json(event);
};

controller.assistEvent = async (req, res) => {
  const event = await EventActivity.findOne({_id:req.params.id,assistants:{$in:[req.user._id]}})  
  let assist
  if(event==null){
    assist = await EventActivity.findByIdAndUpdate({_id:req.params.id}, {$push:{assistants:req.user._id}}, {new:true})
    return res.status(200).json(assist)
  }else{
    assist = await EventActivity.findByIdAndUpdate({_id:req.params.id}, {$pull:{assistants:req.user._id}}, {new:true})
    return res.status(200).json(assist)
  }	
};

controller.getEvent = async (req, res) => {  
  const event = await EveEventActivitynt.findById(req.params.id);  
	res.status(200).json(event);
};

controller.updateEvent = async (req, res) => {
	const event = await EventActivity.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(event);
};

controller.deleteEvent = async (req, res) => {
	const event = await EventActivity.findByIdAndRemove(req.params.id);
	res.status(200).json(event);
};

module.exports = controller;