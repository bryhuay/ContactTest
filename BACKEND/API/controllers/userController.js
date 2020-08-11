const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const fs = require('fs');
const defaultPicture = 'profilePictures\\default.jpeg';
const User = require('../models/user');
const jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');

module.exports = {
	
	create: (req,res,next)=>{
		User.find({email: req.body.email})
		.exec()
		.then(user => {
			if (user.length >= 1) {
				return res.status(409).json({
					message: 'Mail exists'
				});
			}else{
				bcrypt.hash(req.body.password, 10, (err,hash)=>{
					if (err) {
						return res.status(500).json({
							error:err
						});
					}else{
						const user = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hash,
							name: req.body.name
						});
						user 
							.save()
							.then(result => {
								
								res.status(201).json({
									message: 'Succesfully created',
									createdUser: {
										_id: result._id,
										email: result.email,
										password: result.password,
										name: result.name
									},
									token: jwt.sign(
										{
											email: result.email,
											userId: result._id,
											name: result.name
										},
										//process.env.JWT_KEY,
										'secret',
										{
											expiresIn: "2h"
										}
										)
								});
							})
							.catch(err => {
								console.log(err);
								res.status(500).json({
									error:err
								});
							});	
					}
				})
			}
		})
	},
	login: (req,res,next)=>{
		User.find({ email: req.body.email})
		.exec()
		.then(user => {
			if (user.length < 1) {
				return res.status(401).json({
					message: 'Email doesnt exist in DB'
				});
			}
			bcrypt.compare(req.body.password, user[0].password, (err, result) => {
				if (err) {
					return res.status(401).json({
						message: 'Incorrect password'
					});
				}
				if (result) {
					const token = jwt.sign(
					{
						email: user[0].email,
						userId: user[0]._id,
						name: user[0].name
					},
					//process.env.JWT_KEY,
					'secret',
					{
						expiresIn: "2h"
					}
					);
					return res.status(200).json({
						message: 'Auth succesful',
						token: token,
						headers: req.headers,
						user:{
							email: user[0].email,
							userId: user[0]._id,
							name: user[0].name
						}
					});
				}
				res.status(401).json({
					message: 'Auth failed'
				});
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