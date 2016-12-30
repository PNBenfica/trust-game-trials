'use strict'


const config = require('./config/config.json')
const constants = require('./constants')
const tests = require('./functions/tests')

module.exports = router => {

	router.get('/', (req, res) => res.end('Welcome to trust game trial!'))


	router.post('/tests', (req, res) => {

		console.log(req)

		const { type, data } = req.body

		console.log("\n" + "| NEW TEST | Type: " + type)

		if (!type || !type.trim() || !validTestType(type) ) {
			res.status(400).json({message: 'Invalid Request !'})

		} else {


			tests.insertNewTest(type, data)

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


	function validTestType(type){
		return type == constants.PRE_TEST || type == constants.MAIN_TEST
	}
}