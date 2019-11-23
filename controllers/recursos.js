const Recurso = require("../models/Recurso");
const controller = {};

controller.getRecursos = async (req, res) => {
	
	let recursos = [];
	let {query, limit, skip, search} = req.query
	if(query) query = JSON.parse(query)
	
	if (search){
		//title authors volume y fecha; 
		query = {...query,$or:[
			{title:{$regex:search || '', $options:'i'}},
			{authors:{$regex:search || '', $options:'i'}},
			{volume:{$regex:search || '', $options:'i'}}
		]}
	}	
	// si no hay query params mando todos
	let count  = await Recurso.count()
	recursos = await Recurso.find(query||{}).limit(Number(limit)||0).skip(Number(skip)||0).sort('-created_at')//.populate('user')
	return res.status(200).json({
		count,
		data:recursos
	})
};


controller.postRecurso = async (req, res) => {		
  req.body['user'] = req.user._id
  if(req.files){
		req.files.forEach(element => {
			if(req.body[`${element.fieldname}URLS`])req.body[`${element.fieldname}URLS`].push(element.secure_url)
			else req.body[`${element.fieldname}URLS`] = [element.secure_url]
		})
	}
	const recurso = await Recurso.create(req.body)
	recurso['user'] = req.user
	res.status(201).json(recurso);
};

controller.likeRecurso = async (req, res) => {
  const recurso = await Recurso.findOne({_id:req.params.id,liked:{$in:[req.user._id]}})  
  let liked
  if(recurso==null){
    liked = await Recurso.findByIdAndUpdate({_id:req.params.id}, {$push:{liked:req.user._id}}, {new:true}).populate('user')
    return res.status(200).json(liked)
  }else{
    liked = await Recurso.findByIdAndUpdate({_id:req.params.id}, {$pull:{liked:req.user._id}}, {new:true}).populate('user')
    return res.status(200).json(liked)
  }	
};

controller.getRecurso = async (req, res) => {  
  const recurso = await Recurso.findById(req.params.id);  
	res.status(200).json(recurso).populate('user');
};

controller.updateRecurso = async (req, res) => {
	const recurso = await Recurso.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).populate('user');
	res.status(200).json(recurso);
};

controller.deleteRecurso = async (req, res) => {
	const recurso = await Recurso.findByIdAndRemove(req.params.id);
	res.status(200).json(recurso);
};

module.exports = controller;