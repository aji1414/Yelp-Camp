var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var Comment = require("../models/comment")
// had to use this to fix issue with find by id function
var	ObjectId = require('mongodb').ObjectID
var middleware = require("../middleware/index")

// CAMPGROUND ROUTES
//INDEX route - SHOW ALL CAMPGROUNDS
router.get("/", function(req,res){
	//get all campgrounds from DB
	Campground.find({},function(err,allcampgrounds){
		if (err){
			console.log(err)
		}
		else{
			res.render("campgrounds/index", {campgrounds:allcampgrounds})
		}
	});
	
});

// CREATE route- ADD NEW CAMPGROUND TO DATABASE
router.post("/",middleware.isLoggedIn, function(req,res){
	// 	get data from form and add to campground array
	var name = req.body.name;
	var image = req.body.image;
	var description = req.body.description;
	var price = req.body.price;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newCampground = {name:name,
						 image:image,
						 description:description,
						 price:price,
						 author:author};

	Campground.create(
	newCampground,function(err,newlyCreated){
		if(err){
			console.log(err)
		}
		else{
			res.redirect("/")
		}
	})
	
});

// NEW route - SHOW FORM TO CREATE NEW CAMPGROUND
router.get("/new",middleware.isLoggedIn, function(req,res){
	res.render("campgrounds/new")
})


// SHOW route - SHOW INFO ON SPECIFIC ITEM ON INDEX ROUTE.has to come after NEW route. More info on particular campground
router.get("/:id", function(req,res){
// 	find the campground with provided ID

	var id = ObjectId(req.params.id)
// 	.populate is to populate the comments with the actual content instead of just leaving it with the comment id reference
	Campground.findById(id).populate("comments").exec(function(err, foundCampground){
		if(err){
			// console.log(err)
		}
		else{

	// 	render show template with that campground
		res.render("campgrounds/show",{campground:foundCampground})

		}
	})
})

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
	Campground.findById(req.params.id, function(req, foundCampground){
		res.render("campgrounds/edit",{campground:foundCampground})
	})
		
})

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
	// find and update correct campground
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
		if(err){
			res.redirect("/campgrounds")
		}
		else{
			res.redirect("/campgrounds/" + req.params.id)
		}
	})
})

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkCampgroundOwnership, function(req,res){
	Campground.findByIdAndRemove(req.params.id, function(err,campgroundRemoved){
		if(err){
			res.redirect("/campgrounds")
		}
		else{
// 			delete comments associated with campground from database also
			Comment.deleteMany({_id: {$in:campgroundRemoved.comments}}, (err) => {
				if(err){
					console.log(err)
				}
				else{
					res.redirect("/campgrounds")
				}
			})
	
		}
	})	
})




module.exports = router;