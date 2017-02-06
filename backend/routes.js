'use strict'


const config = require('./config/config.json')
const constants = require('./constants')
const tests = require('./functions/tests')

module.exports = router => {

	router.get('/', (req, res) => res.end('Welcome to trust game trial!'))


	router.post('/tests', (req, res) => {

		const { type, data, age, gender } = req.body

		console.log("\n" + "| NEW TEST | Type: " + type + " | Age: " + age + " | Gender: " + gender)

		if (!type || !type.trim() || !age || !age.trim() || !gender || !gender.trim() || !validTestType(type) ) {
			res.status(400).json({message: 'Invalid Request !'})

		} else {


			tests.insertNewTest(type, data, age, gender)

			.then(result => {
				res.status(result.status).json({ message: result.message })
			})

			.catch(err => res.status(err.status).json({ message: err.message }))
		}
	})


	router.get('/tests', (req, res) => {

		console.log("\n" + "| GET TESTS |")

		tests.getTests()

		.then(result => res.json(result))

		.catch(err => res.status(err.status).json({ message: err.message }))
	})


	router.get('/stats', (req, res) => {

		console.log("\n" + "| GET TESTS |")

		tests.getStats()

		.then(result => res.json(result))

		.catch(err => res.status(err.status).json({ message: err.message }))
	})


	function validTestType(type){
		return type == constants.PRE_TEST || type == constants.MAIN_TEST
	}
}