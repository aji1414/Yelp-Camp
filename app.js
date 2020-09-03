var express 				= require("express"),
	app 					= express(),
// try including this body parser in Search movie app?
	bodyParser 				= require("body-parser"),
	mongoose 				= require("mongoose"),
	Campground 				= require("./models/campground"),
	Comment 				= require("./models/comment"),
	passport 				= require("passport"),
	flash 					= require("connect-flash"),
	localStrategy 			= require("passport-local"),
	User 					= require("./models/user"),
	seedDB 					= require("./seeds"),
	commentRoutes 			= require("./routes/comments"),
	campgroundRoutes 		= require("./routes/campgrounds"),
	indexRoutes 			= require("./routes/index"),
	methodOverride 			= require("method-override")

	
// create db here. Setup up the environment variable DATABASEURL so it connects to correct database depending on whether production site is requested or test site
var url = process.env.DATABASEURL || "mongodb://localhost:27017/yelp_camp_v12"
mongoose.connect(URL, {useUnifiedTopology:true, useNewUrlParser: true});

console.log(process.env.DATABASEURL);
// mongoose.connect("mongodb://localhost:27017/yelp_camp_v12")

// hide password in an environment variable with the dotenv package
// mongoose.connect("mongodb+srv://aji1414:Souther9@yelpcamp.wf3zo.mongodb.net/YelpCamp?retryWrites=true&w=majority", {
// 	useNewUrlParser: true,
// 	useCreateIndex: true,
// 	useUnifiedTopology: true
// }).then(() =>{
// 	console.log("Connected to DB");
// }).catch(err => {
// 	console.log("ERROR", err.message)
// })


app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs")
// dirname is the current directory

app.use(express.static(__dirname + '/public'));
app.use(methodOverride("_method"));
app.use(flash());
// seed the database
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "My God is mighty",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error")
	res.locals.success = req.flash("success")
	next();
})

app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);
app.use(indexRoutes);

// ==================================
// 				routes
// ==================================
app.get("/",function(req,res){
		res.render("landing")
})

app.listen(process.env.PORT || 3000, function(){
	console.log("Yelp camp server has started");
	
});