// connection to database
import mongoose from 'mongoose';

let url = "";
if (process.env.MODE === "DEV") {
	url = process.env.MONGO_TEST_URL;
} else {
	url = process.env.MONGO_URL;
}

const STATUS = {
	0: "disconnected",
	1: "connected",
	2: "connecting",
	3: "disconnecting",
};

const _connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_TEST_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		mongoose.connection.on("connecting", () => {
			console.log("MongoDB is connecting");
		});
		mongoose.connection.on("connected", () => {
			console.log("MongoDB is connected");
		});
		mongoose.connection.on("disconnecting", () => {
			console.log("MongoDB is disconnecting");
		});
		mongoose.connection.on("disconnected", () => {
			console.log("MongoDB is disconnected");
		});
		console.log(
			`connection to MongoDB status: ${
				STATUS[mongoose.connection.readyState]
			}`
		);
	} catch (error) {
        console.log(error);
		console.log(`connection to MongoDB status: Failed [fatal error]`);
		process.exit();
	}
};

export default _connect;