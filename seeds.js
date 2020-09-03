var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
	{
		name: "Lewis Hamilton",
		image: "https://www.driving.co.uk/s3/st-driving-prod/uploads/2019/02/Formula-One-2019-Pre-season-Testing-Mercedes-W10-01.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel nibh eros. Vivamus mollis luctus libero eu vulputate. Mauris at sapien finibus, iaculis enim non, congue eros. Sed eleifend dapibus felis. Nulla imperdiet sed mi quis rhoncus. Quisque pharetra mattis dolor sed pulvinar. Nullam sed erat vel neque viverra pharetra id a nunc. Sed sit amet est mi. Curabitur porta rhoncus metus sed cursus. Nam efficitur, urna vitae pharetra malesuada, est nisi faucibus ante, a consectetur purus metus nec dui. Vestibulum sed faucibus ipsum, id faucibus neque."
	},
	{
		name: "Max Verstappen",
		image: "https://e2.365dm.com/20/01/2048x1152/skysports-f1-silverstone-start_4888080.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel nibh eros. Vivamus mollis luctus libero eu vulputate. Mauris at sapien finibus, iaculis enim non, congue eros. Sed eleifend dapibus felis. Nulla imperdiet sed mi quis rhoncus. Quisque pharetra mattis dolor sed pulvinar. Nullam sed erat vel neque viverra pharetra id a nunc. Sed sit amet est mi. Curabitur porta rhoncus metus sed cursus. Nam efficitur, urna vitae pharetra malesuada, est nisi faucibus ante, a consectetur purus metus nec dui. Vestibulum sed faucibus ipsum, id faucibus neque."
	},
	{
		name: "Daniel Ricciardo",
		image: "https://cdn-1.motorsport.com/static/img/amp/600000/660000/668000/668500/668586/s6_950133/f1-spanish-gp-2015-start-nico-rosberg-mercedes-amg-f1-w06-leads.jpg",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vel nibh eros. Vivamus mollis luctus libero eu vulputate. Mauris at sapien finibus, iaculis enim non, congue eros. Sed eleifend dapibus felis. Nulla imperdiet sed mi quis rhoncus. Quisque pharetra mattis dolor sed pulvinar. Nullam sed erat vel neque viverra pharetra id a nunc. Sed sit amet est mi. Curabitur porta rhoncus metus sed cursus. Nam efficitur, urna vitae pharetra malesuada, est nisi faucibus ante, a consectetur purus metus nec dui. Vestibulum sed faucibus ipsum, id faucibus neque."
	},
	
]

function seedDB(){
// 	remove all campgrounds
		Campground.deleteMany({}, function(err){
			if(err){
				console.log(err)
			}
			else{
				console.log("removed campgrounds!")
				// 	add a few campgrounds

				data.forEach(function(seed){
				Campground.create(seed, function(err, campground){
					if (err){
						console.log(err)
					}
					else {
						console.log("campground added")
// 						create a comment
						Comment.create(
							{
								text: "This driver has his strenghts but weaknesses also",
							author: "Aji"}, function(err,comment){
								if (err){
									console.log(err)
								}
								else{
									campground.comments.push(comment);
									campground.save();
									console.log("Created a new comment");
								}
							})
					}
				})
		})
			}
		});
}
		

module.exports = seedDB;
	
	