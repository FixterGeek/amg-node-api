const User = require("../models/User");
const controller = {};
const {validatingProfile} = require('../helpers/mailer')


controller.followUser = async(req, res) => {
	const toFollowUser = await User.findOne({_id:req.params.id,followers:{$in:[req.user._id]}})
	const user = await User.findOne({_id:req.user._id,following:{$in:[req.params.id]}})  
	let following
	let follower
  if(user==null && toFollowUser==null){
		following = await User.findByIdAndUpdate({_id:req.params.id}, {$push:{followers:req.user._id}}, {new:true})
		follower = await User.findByIdAndUpdate({_id:req.user._id}, {$push:{following:req.params.id}}, {new:true})
    return res.status(200).json({following, follower})
  }else{
    following = await User.findByIdAndUpdate({_id:req.params.id}, {$pull:{followers:req.user._id}}, {new:true})
		follower = await User.findByIdAndUpdate({_id:req.user._id}, {$pull:{following:req.params.id}}, {new:true})
    return res.status(200).json({following, follower})
  }	
}

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
	const user = await User.findById(req.params.id).populate('workedAtInstitutions')
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