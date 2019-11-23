const User = require("../models/User");
const Filial = require("../models/Filial");
const controller = {};
const {validatingProfile, userIsApproved, userIsRejected} = require('../helpers/mailer')


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
	let {query, limit, skip} = req.query
	if(query) query = JSON.parse(query)
	// si no hay query params mando todos
	users = await User.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0)
	return res.status(200).json(users)
};

controller.getUsersSummary = async () => {
	const users = await User.aggregate.count()	
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
	.populate('renewals')
	.populate('eventOrders')
	.populate('courseOrders')
	.populate('following')
	.populate('followers')
	return res.status(200).json(user)
}

controller.updateUser = async (req, res) => {	
	if(req.body['teachingActivities']) delete req.body['teachingActivities']
	if(req.body['hospitalActivities']) delete req.body['hospitalActivities']
	if(req.body['medicalSocieties']) delete req.body['medicalSocieties']
	if(req.body['studies']) delete req.body['studies']
	if(req.body['assistedEvents']) delete req.body['assistedEvents']
	if(req.body['assistedActivities']) delete req.body['assistedActivities']	
	if(req.file||req.files){		
		req.files.forEach(element => {
			if(element.fieldname == 'photo'){
				let basics = {...req.body.basicData, photoURL:element.secure_url}	
				return req.body['basicData'] = basics
			}
			if(req.body[`${element.fieldname}URLS`])req.body[`${element.fieldname}URLS`].push(element.secure_url)
			else req.body[`${element.fieldname}URLS`] = [element.secure_url]
		})
	}
	const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
	if (req.body['filialAsUser']) {
		const filialForUser = await Filial.findOne({_id:req.body['filialAsUser'],users:{$in:[req.body['filialAsUser']]}})
		if(filialForUser==null) await Filial.findByIdAndUpdate({_id:req.body.filialAsUser}, {$push:{users:req.params.id}}, {new:true})
	}
	if(req.body['filialAsAdmin']){
		const filialForAdmin = await Filial.findOne({_id:req.body['filialAsAdmin'],administrators:{$in:[req.body['filialAsAdmin']]}})
		if (filialForAdmin==null) await Filial.findByIdAndUpdate({_id:req.body.filialAsAdmin}, {$push:{administrators:req.params.id}}, {new:true})
	}

	//mails
	if(user.userStatus == 'Pendiente' && !user.mails.inRevision) {
		validatingProfile(user)
			.then((r)=>{
				User.findByIdAndUpdate(req.params.id,{$set:{mails:{inRevision:true}}},{new:true})
		}).catch(e=>console.log(e))
	}
	if(user.userStatus == 'Aprobado' && !user.mails.approved) {
		userIsApproved(user)
			.then((r)=>{
				User.findByIdAndUpdate(req.params.id,{$set:{mails:{approved:true}}},{new:true})
		}).catch(e=>console.log(e))
	}
	if(user.userStatus == 'No Aprobado' && !user.mails.rejected) {
		userIsRejected(user)
			.then((r)=>{
				User.findByIdAndUpdate(req.params.id,{$set:{mails:{rejected:true}}},{new:true})
		}).catch(e=>console.log(e))
	}
	return res.status(200).json(user)
};

controller.deleteUser = async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);
	return res.status(200).json(user);
};

module.exports = controller;