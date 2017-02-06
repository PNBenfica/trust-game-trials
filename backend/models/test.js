'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const testSchema = mongoose.Schema({ 
  type            : String,
  created_at      : String,
  age      		  : Number,
  gender      	  : String,
  data			  : [{
  						name: String,
  						rating: Number,
  						sellerRating: Number,
  						purchase_decision: Boolean,
  					}]
});

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/trust-game-trials');

module.exports = mongoose.model('test', testSchema);    