const OrderModel = require("../../models/order.model");
const { typeMatch, isEmpty } = require("../../improve/improve");
const { randomHash } = require("../../improve/encryption");
// with fields { id ,order_name,paid status,amount paid,items ordered(products ordered),address}

const createOrder = async (req, res, next) => {
	const {
		order_name,
		order_email,
		phone_number,
		amount_paid,
		items_ordered,
		address,
		paid_status,
	} = req.body;

	// /* ---------------------  END TYPE CHECK ------------------------------- */

	try {
		const PAYLOAD = {
			order_name,
			order_email,
			phone_number,
			amount_paid,
			items_ordered,
			address,
			paid_status,
		};
		const newOrder = new OrderModel(PAYLOAD);
		const res_save = await newOrder.save();
		if (isEmpty(res_save._id)) {
			return res.status(400).json({
				msg: "unable to send message",
			});
		}

		return res.status(200).json({
			order_id: res_save.id,
			amount: res_save.amount_paid,
			msg: "new order request created",
			success: "order created",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: "Server error | createOrder ",
		});
	}
};

module.exports = { createOrder };
