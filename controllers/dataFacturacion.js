const DataFacturacion = require("../models/DataFacturacion");
const User = require("../models/User");
const controller = {};

controller.getDataFacturacion = async (req, res) => {	
	const data = await DataFacturacion.findById(req.params.id)
	res.status(201).json(DataFacturacion);
};


controller.postDataFacturacion = async (req, res) => {
	if(req.files){
		req.files.forEach(element => {			
			req.body[`${element.fieldname}URL`] = [element.secure_url]
		})
	}
	const data = await DataFacturacion.create(req.body)
	res.status(201).json(data);
};

controller.updateDataFacturacion = async (req, res) => {
	if(req.files){
		req.files.forEach(element => {			
			req.body[`${element.fieldname}URL`] = [element.secure_url]
		})
	}
	const data = await DataFacturacion.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true})
	res.status(200).json(data);
};


module.exports = controller;