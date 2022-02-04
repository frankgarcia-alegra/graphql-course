const mongoose = require('mongoose');

const UserModel = new mongoose.Schema({
	name: String,
	age: Number,
	profession: String
});

module.exports = mongoose.model("User", UserModel);
