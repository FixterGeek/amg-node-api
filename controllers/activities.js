const Activity = require("../models/Activity");
const controller = {};


controller.getActivitys = async (req, res) => {
	let activities = [];
	console.log(req.query)	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	activities = await Activity.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	return res.status(200).json(activities)
};

controller.postActivity = async (req, res) => {
	const activity = await Activity.create(req.body);
	res.status(200).json(activity);
};

controller.getActivity = async (req, res) => {  
  const activity = await Activity.findById(req.params.id);  
	res.status(200).json(activity);
};

controller.updateActivity = async (req, res) => {
	const activity = await Activity.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(activity);
};

controller.deleteActivity = async (req, res) => {
	const activity = await Activity.findByIdAndRemove(req.params.id);
	res.status(200).json(activity);
};

module.exports = controller;