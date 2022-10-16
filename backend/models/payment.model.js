import mongoose from 'mongoose';
const PaymentSchema = mongoose.Schema({
	razorpayDetails: {
		orderId: String,
		paymentId: String,
		signature: String,
	},
	success: Boolean,
});

export default mongoose.model("payment", PaymentSchema);
