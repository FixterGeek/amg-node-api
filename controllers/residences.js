const Residence = require("../models/Residence");
const controller = {};


controller.getResidences = async (req, res) => {
	let residences = [];	
	let {query, limit, skip} = req.query
	if( query || limit || skip ){
		query = JSON.parse(query)	
		residences = await User.find(query).limit(limit).skip(skip)
		return res.status(200).json(residences)
	}
	// si no hay query params mando todos
	residences = await Residence.find().limit(20).skip(0);
	res.status(200).json(residences)
};

controller.postResidence = async (req, res) => {
	const residence = await Residence.create(req.body);
	res.status(200).json(residence);
};

controller.getResidence = async (req, res) => {  
  const residence = await Residence.findById(req.params.id);  
	res.status(200).json(residence);
};

controller.updateResidence = async (req, res) => {
	const residence = await Residence.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(residence);
};

controller.deleteResidence = async (req, res) => {
	const residence = await Residence.findByIdAndRemove(req.params.id);
	res.status(200).json(residence);
};

module.exports = controller;