const mongoose = require('mongoose');

const HobbyModel = new mongoose.Schema({
	title: String,
	description: String,
	userId: String
});

module.exports = mongoose.model("Hobby", HobbyModel);
