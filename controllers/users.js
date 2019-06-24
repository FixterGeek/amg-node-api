const User = require("../models/User");
const controller = {};


controller.getUsers = async (req, res) => {
	let users = [];
	let queryParams = Object.keys(req.query);
	// filtrando cursos activos por query params
	if( queryParams.length > 0 ){
		let query = {active: true};
		//creado el query dinamicamente
		query["$or"] = queryParams.map(key => {
			return {[key]: req.query[key]}
		});
		users = await User.find(query);
		return res.status(200).json({users})
	}
	// si no hay query params mando todos
	users = await User.find();
	res.status(200).json({users})
};



controller.updateUser = async (req, res) => {
	const User = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(User);
};

controller.deleteUser = async (req, res) => {
	const User = await User.findByIdAndRemove(req.params.id);
	res.status(200).json(User);
};

module.exports = controller;