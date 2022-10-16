// importing models
import { typeMatch, isEmpty } from '../../improve/improve';

import OrderModel from '../../models/order.model';

// importing logger
import logger from '../../improve/logger';

const log = logger();

const xreadAllOrders = async (req, res, next) => {
	try {
		const orderData = await OrderModel.find({});

		if (isEmpty(orderData)) {
			return res.status(200).json({});
		} else {
			return res.status(200).json({"msg": orderData});
		}
	} catch (error) {
        console.log(error)
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_BLOG_READ_ALL_FAILED",
			500,
			"ORDER Read Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_ORDER_READ_ALL_FAILED",
		});
	}
};

export { xreadAllOrders  };
