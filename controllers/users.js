const User = require("../models/User");
const controller = {};


controller.getUsers = async (req, res) => {
	let users = [];
	const {query, limit, skip} = req.params
	if( Object.keys(req.params).length > 0 ){
		users = await User.find(query).limit(limit).skip(skip)
		return res.status(200).json({users})
	}
	// si no hay query params mando todos
	users = await User.find().limit(20).skip(0);
	return res.status(200).json({users})
};

controller.getUser = async(req, res) => {
	const user = await User.findById(req.params.id)
	res.status(200).json(user)
}



controller.updateUser = async (req, res) => {
	const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
	res.status(200).json(User);
};

controller.deleteUser = async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);
	res.status(200).json(user);
};

module.exports = controller;