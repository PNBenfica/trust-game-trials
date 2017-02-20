'use strict'

const test = require('../models/test')
const nodemailer = require('nodemailer')
const config = require('../config/config.json')

exports.insertNewTest = (type, data, age, gender, internetUsage) => 

	new Promise((resolve,reject) => {

		const newTest = new test({
			type: type,
			created_at: new Date(),
			data: data,
			age: age,
			gender: gender,
  			internetUsage: String,
		})


		newTest.save()

		.then(() => {

			const transporter = nodemailer.createTransport(`smtps://${config.email}:${config.password}@smtp.gmail.com`)

			data = data.map(JSON.stringify).reduce((json1,json2) => json1 + json2 + ",<br>", "")
			data = "Age: " + age + "<br/>" + "Gender: " + gender + "<br/>" + "Internet Usage: " + internetUsage + "<br/>" + data

			const mailOptions = {

    			from: `"${config.name}" <${config.email}>`,
    			to: config.email,  
    			subject: 'Store Test Request', 
    			html: `${data}`
    		
			};
			//return true
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


exports.getStats = () => 

	new Promise((resolve,reject) => {

		test.find({})

		.then(tests => {
			tests = tests.map(test => test.data)
			tests = [].concat.apply([],tests)

			const videoNames = [...new Set(tests.map(test => test.name))]
			let stats = {}
			videoNames.forEach(name => stats[name] = [] )
			tests.forEach(test => stats[test.name].push(test.rating) )
			videoNames.forEach(name => {
				const ratings = stats[name]
				stats[name] = {ratings: ratings}
				stats[name].average = ratings.reduce( ( a, b ) => a + b, 0 ) / ratings.length
				stats[name].sd = ratings.map(rating => Math.pow(rating - stats[name].average, 2) ).reduce( ( a, b ) => a + b, 0 ) / ratings.length
			} )
			console.log(stats)
			resolve(stats)
		})

		.catch(err => {console.log(err); reject({ status: 500, message: 'Internal Server Error !' })})
	})
