'use strict'

const test = require('../models/test')
const constants = require('./../constants')
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
  			internetUsage: internetUsage,
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
			resolve({ status: 201, message: 'Test stored successfully! Backup sent to email!' })
		})

		.catch(err => {

			console.log(err);
			reject({ status: 500, message: 'Internal Server Error !' })

		});

	})


exports.getTests = (type) => 

	new Promise((resolve,reject) => {

		test.find({type: { "$eq" : type }})

		.then(resolve)

		.catch(err => reject({ status: 500, message: 'Internal Server Error !' }))
	})


exports.getStats = (testType) => 

	new Promise((resolve,reject) => {

		test.find({type: { "$eq" : testType }})

		.then( tests => resolve(renderStats(tests, testType)) )

		.catch(err => {console.log(err); reject({ status: 500, message: 'Internal Server Error !' })})

	})

const renderStats = (tests, testType) => testType === constants.PRE_TEST ? renderPretestStats(tests) : renderMaintestStats(tests)


/*
	Transforms the documents of tests into an one dimensional array of test data ([{video,rating,..}, ..])
*/
function flattenTests(tests){
	tests = tests.map(test => test.data)
	tests = [].concat.apply([],tests)
	return tests
}

/*
	returns an array with the names of the videos
*/
function getVideoNames(tests){
	const videoNames = tests.map(test => test.name)
	const uniqueVideoNames = [...new Set(videoNames)]
	return uniqueVideoNames
}

function getVideoTests(videoName, tests){
	return tests.filter(test => test.name === videoName)
}

function getVideosTests(videosName, tests){
	return tests.filter(test => videosName.includes(test.name))
}

function getVideoRatings(videoName, tests){
	tests = getVideoTests(videoName, tests)
	return tests.map(test => test.rating)
}

function getVideoStats(videoName, tests){
	const ratings = getVideoRatings(videoName, tests)
	return { name: videoName, ratings , average: average(ratings), sd: standardDeviation(ratings), purchaseDecisions: getPurchaseDecisions(tests)  }
}

function renderPretestStats(tests){ 
	tests = flattenTests(tests)
	const videoNames = getVideoNames(tests)
	return videoNames.map((videoName) => getVideoStats(videoName, tests))
}

function renderMaintestStats(tests){
	const testsData = flattenTests(tests)
	return {results: { byVideo : renderPretestStats(tests), bySellerRating : renderStatsBySellerRating(testsData), bySellerVideo : renderStatsBySellerVideo(testsData), byMatrixCombination : renderStatsByMatrixCombination(testsData) }}
}

function renderStatsBySellerRating(tests){
	const sellerRatings = [0,1,2,3,4,5]
	return sellerRatings.map((sellerRating) => getSellerRatingStats(sellerRating, tests))
}

function getSellerRatingTests(sellerRating, tests){
	return tests.filter(test => test.sellerRating === sellerRating)
}

function getSellerRatingStats(sellerRating, tests){
	const sellerRatingTests = getSellerRatingTests(sellerRating, tests)
	const purchaseDecisions = getPurchaseDecisions(sellerRatingTests)
	return { sellerRating, buy : purchaseDecisions.buy, notBuy : purchaseDecisions.notBuy }
}

function getPurchaseDecisions(tests){
	const purchaseDecisions = tests.map(test => test.purchase_decision)
	return { buy : getNumberBuyDecisions(purchaseDecisions), notBuy : getNumberNotBuyDecisions(purchaseDecisions) }
}

function getNumberBuyDecisions(purchaseDecisions){
	return sum(purchaseDecisions)
}

function getNumberNotBuyDecisions(purchaseDecisions){
	return purchaseDecisions.length - getNumberBuyDecisions(purchaseDecisions)
}

// returns the tests of each video type
function getTestsByVideoType(tests){
    let videosSets = [["margarida.mp4", "rui.mp4", "paula.mp4"], ["pedro.mp4", "alexandre.mp4", "rafa.mp4"], [""]]
    return videosSets.map(videos => getVideosTests(videos, tests) )
}

function renderStatsBySellerVideo(tests){
    const [trust, distrust, noVideo] = getTestsByVideoType(tests).map(getPurchaseDecisions)
	return { trust, distrust, noVideo }
}

function renderStatsByMatrixCombination(tests){
    const [trust, distrust, noVideo] = getTestsByVideoType(tests)
    const [ Good_Video_Good_Reputation, Good_Video_Bad_Reputation, Good_Video_No_Reputation ] = renderMatrixRowResult(trust)
    const [ Bad_Video_Good_Reputation, Bad_Video_Bad_Reputation, Bad_Video_No_Reputation ] = renderMatrixRowResult(distrust)
    const [ No_Video_Good_Reputation, No_Video_Bad_Reputation, No_Video_No_Reputation ] = renderMatrixRowResult(noVideo)

    return { Good_Video_Good_Reputation, Good_Video_Bad_Reputation, Good_Video_No_Reputation, Bad_Video_Good_Reputation, Bad_Video_Bad_Reputation, Bad_Video_No_Reputation, No_Video_Good_Reputation, No_Video_Bad_Reputation, No_Video_No_Reputation }
}

// renders the results of the good/bad/no videos
function renderMatrixRowResult(tests){
	const sellerRatings = [4,3,0]
	tests = sellerRatings.map((sellerRating) => getSellerRatingTests(sellerRating, tests))
	return tests.map(getPurchaseDecisions)
}



const sum = (array) => array.reduce( ( a, b ) => a + b, 0 )
const average = (array) => sum(array) / array.length
const deviation = (point, mean) => point - mean
const squaredDeviation = (point, mean) => Math.pow(deviation(point, mean), 2)
const squaredDeviations = (array) => array.map(a => squaredDeviation(a, average(array)))
const variance = (array) => average(squaredDeviations(array))
const standardDeviation = (array) => Math.sqrt(variance(array))