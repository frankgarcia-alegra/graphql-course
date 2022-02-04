const mongoose = require('mongoose');

const PostModel = new mongoose.Schema({
	comment: String,
	userId: String
});

module.exports = mongoose.model("Post", PostModel);
