// importing models
const { typeMatch, isEmpty } = require("../../improve/improve");
const OrderModel = require("../../models/order.model");

// importing logger
const { logger } = require("../../improve/logger");
const log = logger(__filename);


const deleteOrder  = async (req, res, next) => {
	const orderId = req.body.orderId;

	if (!typeMatch(orderId)) {
		return res.status(404).json({
			msg: "order ID cannot be empty",
		});
	}

	try {
		const deletedorder = await OrderModel.deleteOne({ _id: orderId });

		if (deletedorder.deletedCount !== 1) {
			return res.status(400).json({
				msg: `order with ID ${orderId} does not exists`,
			});
		}

		return res.status(200).json({
			msg: `order with ID ${orderId} has been deleted`,
		});
	} catch (error) {
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_order_DELETE_01",
			500,
			"order Delete Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_order_DELETE_ERROR",
		});
	}
};

module.exports = { deleteOrder };
