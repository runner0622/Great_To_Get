const OrderModel = require("../../models/order.model");
const { isEmpty } = require("../../improve/improve");

const trackOrder = async (req, res, next) => {
	const { order_id } = req.body;

	try {
		const fetchResult = await OrderModel.findById({ _id: order_id });

		try {
			if (isEmpty(fetchResult)) {
				return res.status(404).json({
                    msg: `No order found with tracking id ${order_id}`,
                    success: "failed",
                    tracking_status: "does not exists",
				});
			}

			return res.status(200).json({
				msg: "order id exists",
				success: "success",
				tracking_status: fetchResult?.track,
			});
		} catch (error) {
			return res.status(400).json({
                msg: `No order found with tracking id ${order_id}`,
                success: "failed",
                tracking_status: "does not exists",
            });
		}
	} catch (error) {
		return res.status(400).json({
			msg: `No order found with tracking id ${order_id}`,
			success: "failed",
			tracking_status: "does not exists",
            error: "Server Error | Tracking failed"
		});
	}
};

module.exports = { trackOrder };
