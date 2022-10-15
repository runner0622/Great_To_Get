const mongoose = require("mongoose");
const PaymentSchema = mongoose.Schema({
	razorpayDetails: {
		orderId: String,
		paymentId: String,
		signature: String,
	},
	success: Boolean,
});

module.exports = mongoose.model("payment", PaymentSchema);
