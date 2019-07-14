const User = require("../models/User");
const controller = {};
const {validatingProfile} = require('../helpers/mailer')



controller.getUsers = async (req, res) => {
	let users = [];
	console.log(req.query)
	let {query, limit, skip} = req.query
	if( query || limit || skip ){
		query = JSON.parse(query)	
		users = await User.find(query).limit(limit).skip(skip)
		return res.status(200).json(users)
	}
	// si no hay query params mando todos
	users = await User.find().limit(20).skip(0);
	return res.status(200).json(users)
};

controller.getUser = async(req, res) => {
	const user = await User.findById(req.params.id)
	return res.status(200).json(user)
}

controller.updateUser = async (req, res) => {
	console.log(req.file, req.body.basicData)
	if(req.file||req.files) {
		let basics = {...req.body.basicData, photoURL:req.file.secure_url}	
		req.body['basicData'] = basics
	}
	const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
	//if(req.body.userStatus == 'Pendiente') validatingProfile(user)
	return res.status(200).json(user)
};

controller.deleteUser = async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);
	return res.status(200).json(user);
};

module.exports = controller;