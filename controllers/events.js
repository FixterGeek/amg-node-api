const Event = require("../models/Event");
const controller = {};


controller.getEvents = async (req, res) => {
	let events = [];
	let queryParams = Object.keys(req.query);
	// filtrando cursos activos por query params
	if( queryParams.length > 0 ){
		let query = {active: true};
		//creado el query dinamicamente
		query["$or"] = queryParams.map(key => {
			return {[key]: req.query[key]}
		});
		events = await Event.find(query);
		return res.status(200).json(events)
	}
	// si no hay query params mando todos
	events = await Event.find();
	res.status(200).json(events)
};

controller.postEvent = async (req, res) => {
	const event = await Event.create(req.body);
	res.status(200).json(event);
};

controller.getEvent = async (req, res) => {
  console.log(req.params)
  const event = await Event.findById(req.params.id);
  console.log(event)
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