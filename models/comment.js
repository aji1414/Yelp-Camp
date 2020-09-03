var mongoose = require("mongoose")

// schema setup and make model which makes the schema
var commentSchema = mongoose.Schema({
	text:String,
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

// var Campground = mongoose.model("Campground",campgroundSchema)

module.exports = mongoose.model("Comment",commentSchema);