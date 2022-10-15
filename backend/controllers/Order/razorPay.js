import PaymentModel from "../../models/payment.model";

const razorPay = (req, res, next) => {
	try {
		const {
			orderCreationId,
			razorpayPaymentId,
			razorpayOrderId,
			razorpaySignature,
		} = req.body;

		const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
		shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
		const digest = shasum.digest("hex");

		if (digest !== razorpaySignature)
			return res.status(400).json({ msg: "Transaction not legit!" });

		const newPayment = PaymentModel({
			razorpayDetails: {
				orderId: razorpayOrderId,
				paymentId: razorpayPaymentId,
				signature: razorpaySignature,
			},
			success: true,
		});

		await newPayment.save();

		res.json({
			msg: "success",
			orderId: razorpayOrderId,
			paymentId: razorpayPaymentId,
		});
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = { razorPay };
