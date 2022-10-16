//allow or block ip addreses
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();



import { allowPublicCORS, allowPrivateCORS, MODE, HOSTNAME } from "./improve/helper";


import express, { urlencoded, json } from "express";
const app = express();
// import path from "path";
import _connect from "./middlewares/_connect";

import publicHandlers from "./routes/publicRoutes";
import authHandlers from "./routes/authRoutes";
import blogHandlers from "./routes/blogRoutes";
import productHandlers from "./routes/productRoutes";
import genericHandlers from "./routes/genericRoutes";
import orderHandlers from "./routes/orderRoutes";
import uploadHandlers from "./routes/uploadRoutes";
import  _authToken from "./middlewares/_authToken";

app.use(urlencoded({ extended: true }));
app.use(json({ limit: "10mb", extended: true }));



// set a static folder
app.set("json spaces", 2);

// public api routes
app.use("/api", cors(allowPublicCORS), publicHandlers);
app.use("/upload", cors(allowPublicCORS), uploadHandlers);

// private api routes
app.use("/auth", cors(allowPublicCORS), authHandlers);
app.use("/blog", cors(allowPublicCORS), _authToken, blogHandlers);
app.use("/product", cors(allowPublicCORS), _authToken, productHandlers);
app.use("/generic", cors(allowPublicCORS), _authToken, genericHandlers);
app.use("/order", cors(allowPublicCORS), _authToken, orderHandlers);

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

app.listen(process.env.PORT || 2000, async (err) => {
	console.log("connected to node");
	if (err) {
		console.log("could not connect to node");
	} else {
		try {
			await _connect();
		} catch (error) {
            console.log(error);
			console.log("could not connect to mongodb");
		}
	}
});
