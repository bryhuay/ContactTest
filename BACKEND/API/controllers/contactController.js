const mongoose = require('mongoose');
const Contact = require('../models/contact');


module.exports = {
	show: (req,res,next)=>{
		Contact.find()
			.select('_id name telephone email type')
			.exec()
			.then(docs => {
				const response = {
					res: 0,
					data:{
						count: docs.length,
						contacts: docs.map(doc => {
							return {
								_id: doc._id,
								name: doc.name,
								telephone: doc.telephone,
								email: doc.email,
								type: doc.type
							}
						})
					},
					message:''
					
				};
				res.status(200).json(response);
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	create: (req,res,next)=>{
		
		const contact = new Contact({
			_id: new mongoose.Types.ObjectId(),
			name: req.body.name,
			telephone: req.body.telephone,
			email: req.body.email,
			type: req.body.type
		});
		contact
			.save()
			.then(result=>{
				res.status(200).json({
					res:0,
					data:{
						createdContact: {
							_id: result._id,
							DNI: result.DNI,
							name: result.name,
							last_name: result.last_name,
							address: result.address,
							cellphone: result.cellphone,
							telephone: result.telephone,
							email: result.email,
							school: result.school
						}
					},
					message: 'Created succesfully'
					
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	find: (req,res,next)=>{
		const id = req.query.contactId;
		Contact.findById(id)
			.select('_id name  telephone email type')
			.exec()
			.then(doc=> {
				if (doc) {
					res.status(200).json({
						res:0,
						message:'',
						data:{
							contact: doc
						}
						
					});
				}else{
					res.status(404).json(
						{
							res:99,
							message: 'No valid entry found for provided ID',
							data: null
						});
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	like: (req,res,next)=>{
		const name = req.query.nombre;
		Contact.find({name: {$regex: name, $options: 'i'}})
			.select('_id name  telephone email type')
			.exec()
			.then(doc=> {
				if (doc) {
					res.status(200).json({
						res:0,
						message:'',
						data:{
							contacts: doc
						}
						
					});
				}else{
					res.status(404).json(
						{
							res:99,
							message: 'No valid entry found for provided ID',
							data: null
						});
				}
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	update: (req,res,next)=>{
		const id = req.body.contactId;
		const updateOps = req.body;
		delete updateOps._id
		Contact.update({_id:id},{$set: updateOps})
			.exec()
			.then(result => {
				res.status(200).json({
					data:null,
					message: 'Updated',
					res:0
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	},
	delete: (req,res,next)=>{
		const id = req.body.contactId;
		Contact.findOneAndRemove({_id: id})
			.exec()
			.then(result => {
				res.status(200).json({
					data:null,
					message: 'Deleted',
					res:0
				});
			})
			.catch(err => {
				console.log(err);
				res.status(500).json({
					error: err
				});
			});
	}
}