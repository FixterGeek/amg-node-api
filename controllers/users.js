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
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	users = await User.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	return res.status(200).json(users)
};
controller.getUsersSummary = async () => {
	const users = await User.aggregate.count()
	console.log(users)
	return users

}

controller.getUser = async(req, res) => {
	const user = await User.findById(req.params.id)
	.populate('teachingActivities')
	.populate('hospitalActivities')
	.populate('medicalSocieties')
	.populate('studies')
	.populate('assistedEvents')
	.populate('assistedActivities')
	return res.status(200).json(user)
}

controller.updateUser = async (req, res) => {
	if(req.body['teachingActivities']) delete req.body['teachingActivities']
	if(req.body['hospitalActivities']) delete req.body['hospitalActivities']
	if(req.body['medicalSocieties']) delete req.body['medicalSocieties']
	if(req.body['studies']) delete req.body['studies']
	if(req.body['assistedEvents']) delete req.body['assistedEvents']
	if(req.body['assistedActivities']) delete req.body['assistedActivities']
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