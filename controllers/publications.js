const Publication = require("../models/Publication");
const controller = {};
const sharp = require('sharp')

controller.getPublications = async (req, res) => {
	
	let publications = [];	
	let {query, limit, skip} = req.query
	if( query || limit || skip ){
		query = JSON.parse(query)
		console.log(query)
		publications = await Publication.find(query).populate('user').limit(limit).skip(skip)
		return res.status(200).json(publications)
	}
	// si no hay query params mando todos
	publications = await Publication.find().limit(20).skip(0);
	res.status(200).json(publications)
};


controller.postPublication = async (req, res) => {
	//testing	
	console.log(req.files, req.body)	
  req.body['user'] = req.user._id
  if(req.files){
		req.files.forEach(element => {
			if(req.body[`${element.fieldname}URLS`])req.body[`${element.fieldname}URLS`].push(element.secure_url)
			else req.body[`${element.fieldname}URLS`] = [element.secure_url]
		})
	}
	const publication = await Publication.create(req.body).populate('user');
	res.status(200).json(publication);
};

controller.likePublication = async (req, res) => {
  const publication = await Publication.findOne({_id:req.params.id,liked:{$in:[req.user._id]}})
  console.log(publication)
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