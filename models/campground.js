var mongoose = require("mongoose")

// schema setup and make model which makes the schema
var campgroundSchema = mongoose.Schema({
	name:String,
	image: String,
	description: String,
	price: String,
	author: {
		id:{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
		
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	]
	
});

// var Campground = mongoose.model("Campground",campgroundSchema)

module.exports = mongoose.model("Campground",campgroundSchema);