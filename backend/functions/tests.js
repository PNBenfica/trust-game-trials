'use strict'

const test = require('../models/test')
const nodemailer = require('nodemailer')
const config = require('../config/config.json')

exports.insertNewTest = (type, data) => 

	new Promise((resolve,reject) => {

		const newTest = new test({
			type: type,
			created_at: new Date(),
			data: data
		})


		newTest.save()

		.then(() => {

			const transporter = nodemailer.createTransport(`smtps://${config.email}:${config.password}@smtp.gmail.com`)

			data = data.map(JSON.stringify).reduce((json1,json2) => json1 + json2 + ",<br>", "")

			const mailOptions = {

    			from: `"${config.name}" <${config.email}>`,
    			to: config.email,  
    			subject: 'Store Test Request', 
    			html: `${data}`
    		
			};

			return transporter.sendMail(mailOptions)
		})

		.then(info => {

			console.log(info);
			resolve({ status: 201, message: 'Test stored successfully! Backup sent to email!' })
		})

		.catch(err => {

			console.log(err);
			reject({ status: 500, message: 'Internal Server Error !' })

		});

	})


exports.getTests = () => 

	new Promise((resolve,reject) => {

		test.find({})

		.then(resolve)

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))
	})
