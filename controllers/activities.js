const Activity = require("../models/Activity");
const controller = {};


controller.getActivitys = async (req, res) => {
	let activities = [];	
	let {query, limit, skip} = req.query
	if( query || limit || skip ){
		query = JSON.parse(query)	
		activities = await Activity.find(query).limit(limit).skip(skip)
		return res.status(200).json(activities)
	}
	// si no hay query params mando todos
	activities = await Activity.find().limit(20).skip(0);
	res.status(200).json(activities)
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