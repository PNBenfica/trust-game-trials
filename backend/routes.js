'use strict'


const config = require('./config/config.json')
const constants = require('./constants')
const tests = require('./functions/tests')

module.exports = router => {

	router.get('/', (req, res) => res.end('Welcome to trust game trial!'))


	router.post('/tests', (req, res) => {

		const { type, data, age, gender, internetUsage } = req.body

		console.log("\n" + "| NEW TEST | Type: " + type + " | Age: " + age + " | Gender: " + gender + " | InternetUsage: " + internetUsage)

		if (!type || !type.trim() || !age || !age.trim() || !gender || !gender.trim() || !internetUsage || !internetUsage.trim() || !validTestType(type) ) {
			res.status(400).json({message: 'Invalid Request !'})

		} else {


			tests.insertNewTest(type, data, age, gender, internetUsage)

			.then(result => {
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }))
		}
	})


	router.get('/tests/:type', (req, res) => {

		console.log("\n" + "| GET TESTS |")

		const { type } = req.params
		if (!type || !type.trim() || !validTestType(type) ) {
			res.status(400).json({message: 'Invalid Request !'})
		}

		tests.getTests(type)

		.then(result => res.json(result))

		.catch(err => res.status(err.status).json({ message: err.message }))
	})


	router.get('/stats/:type', (req, res) => {

		console.log("\n" + "| GET STATS |")

		const { type } = req.params
		if (!type || !type.trim() || !validTestType(type) ) {
			res.status(400).json({message: 'Invalid Request !'})
		}

		tests.getStats(type)

		.then(result => res.json(result))

		.catch(err => res.status(err.status).json({ message: err.message }))
	})


	function validTestType(type){
		return type == constants.PRE_TEST || type == constants.MAIN_TEST
	}
}