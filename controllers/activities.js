const Activity = require("../models/Activity");
const User = require("../models/User");
const controller = {};


controller.getActivities = async (req, res) => {
	let activities = [];
	console.log(req.query)	
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	activities = await Activity.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0).populate('institution')
	return res.status(200).json(activities)
};

controller.postActivity = async (req, res) => {
	let activity = await Activity.create(req.body)
	if (activity.type === 'Hospitalaria') await User.findByIdAndUpdate(req.body.user,{$push:{hospitalActivities:activity._id}}, {new:true})
	if (activity.type === 'Sociedad') await User.findByIdAndUpdate(req.body.user,{$push:{medicalSocieties:activity._id}}, {new:true})
	if (activity.type === 'Docente') await User.findByIdAndUpdate(req.body.user,{$push:{teachingActivities:activity._id}}, {new:true})
	activity = await Activity.findById(activity._id).populate('institution')
	res.status(201).json(activity);
};

controller.getActivity = async (req, res) => {
  const activity = await Activity.findById(req.params.id).populate('institution')
	res.status(200).json(activity);
};

controller.updateActivity = async (req, res) => {
	const activity = await Activity.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).populate('institution')
	res.status(200).json(activity);
};

controller.deleteActivity = async (req, res) => {
	const activity = await Activity.findByIdAndRemove(req.params.id).populate('institution')
	res.status(200).json(activity);
};

module.exports = controller;