//allow or block ip addreses
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();



const {
	allowPublicCORS,
	allowPrivateCORS,
	MODE,
	HOSTNAME,
} = require("./improve/helper");


const express = require("express");
const app = express();
const path = require("path");
const mongo = require("./middlewares/_connect");

const authHandlers = require("./routes/authRoutes");
const blogHandlers = require("./routes/blogRoutes");
const productHandlers = require("./routes/productRoutes");
const genericHandlers = require("./routes/genericRoutes");
const orderHandlers = require("./routes/orderRoutes");
const publicHandlers = require("./routes/publicRoutes");
const uploadHandlers = require("./routes/uploadRoutes");
const { _authToken } = require("./middlewares/_authToken");

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "10mb", extended: true }));



// set a static folder
app.set("json spaces", 2);

// public api routes
app.use("/api", cors(), publicHandlers);
app.use("/upload", cors(), uploadHandlers);

// private api routes
app.use("/auth", cors(), authHandlers);
app.use("/blog", cors(allowPrivateCORS), _authToken, blogHandlers);
app.use("/product", cors(allowPrivateCORS), _authToken, productHandlers);
app.use("/generic", cors(allowPrivateCORS), _authToken, genericHandlers);
app.use("/order", cors(allowPrivateCORS), _authToken, orderHandlers);

// base url
app.get("/", (req, res) => {
	// send success
	res.send({
		status: "live",
		mode: MODE,
		hostname: HOSTNAME,
	});
});

// Assume 404 since no middleware responded
app.use(function (req, res, next) {
	console.log("error (404)");
	return res.status(404).json({
		url: req.url,
		error: "Not found",
	});
});

// run cron
// cron.runCrons();

app.listen(process.env.PORT || 2000, (err) => {
	console.log("connected to node");
	if (err) {
		console.log("could not connect to node");
	} else {
		try {
			mongo.connect();
		} catch (error) {
			console.log("could not connect to mongodb");
		}
	}
});
