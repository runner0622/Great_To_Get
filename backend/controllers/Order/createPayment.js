const createOrder = async (req, res, next) => {
	const amount = req.body.amount ?? 1;

	try {
		const instance = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID, // YOUR RAZORPAY KEY
			key_secret: process.env.RAZORPAY_SECRET, // YOUR RAZORPAY SECRET
		});

		const options = {
			amount: amount,
			currency: "INR",
			receipt: "receipt_order_74394",
		};

		const order = await instance.orders.create(options);

		if (!order) return res.status(500).send("Some error occured");

		res.json(order);
	} catch (error) {
		res.status(500).send(error);
	}
};

module.exports = { createOrder };
