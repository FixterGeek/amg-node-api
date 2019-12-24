const Publication = require("../models/Publication");
const User = require("../models/User");
const controller = {};

controller.getPublications = async (req, res) => {
	
	let publications = [];		
	let {query, limit, skip} = req.query
	const user = await User.findById(req.user._id)
	if(query) query = JSON.parse(query)
	else query = {user:{$in:[...user.following, user._id]}}
	publications = await Publication.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0).sort('-createdAt').populate('user')
	return res.status(200).json(publications)
};


controller.postPublication = async (req, res) => {
	//testing		
  req.body['user'] = req.user._id
  if(req.files){
		req.files.forEach(element => {
			if(req.body[`${element.fieldname}URLS`])req.body[`${element.fieldname}URLS`].push(element.secure_url)
			else req.body[`${element.fieldname}URLS`] = [element.secure_url]
		})
	}
	const publication = await Publication.create(req.body)
	publication['user'] = req.user
	res.status(201).json(publication);
};

controller.likePublication = async (req, res) => {
  const publication = await Publication.findOne({_id:req.params.id,liked:{$in:[req.user._id]}})  
  let liked
  if(publication==null){
    liked = await Publication.findByIdAndUpdate({_id:req.params.id}, {$push:{liked:req.user._id}}, {new:true}).populate('user')
    return res.status(200).json(liked)
  }else{
    liked = await Publication.findByIdAndUpdate({_id:req.params.id}, {$pull:{liked:req.user._id}}, {new:true}).populate('user')
    return res.status(200).json(liked)
  }	
};

controller.getPublication = async (req, res) => {  
  const publication = await Publication.findById(req.params.id);  
	res.status(200).json(publication).populate('user');
};

controller.updatePublication = async (req, res) => {
	const publication = await Publication.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).populate('user');
	res.status(200).json(publication);
};

controller.deletePublication = async (req, res) => {
	const publication = await Publication.findByIdAndRemove(req.params.id);
	res.status(200).json(publication);
};

module.exports = controller;