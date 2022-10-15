const { typeMatch, isEmpty } = require("../improve/improve");
// with fields { id ,order_name,paid status,amount paid,items ordered(products ordered),address}

const _nullCheckOrder = async (req, res, next) => {
	const {
		order_name,
		phone_number,
		amount_paid,
		items_ordered,
		address,
		paid_status,
		order_email,
	} = req.body;

	/* ---------------------  START NULL CHECK ------------------------------- */

	if (isEmpty(order_name)) {
		return res.status(400).json({
			msg: `order_name should not be empty`,
		});
	}

	if (isEmpty(phone_number)) {
		return res.status(400).json({
			msg: `phone number should not be empty`,
		});
	}

	if (isEmpty(amount_paid)) {
		return res.status(400).json({
			msg: `amount paid phone should not be empty`,
		});
	}

	if (isEmpty(items_ordered)) {
		return res.status(400).json({
			msg: `items ordered should not be empty`,
		});
	}

	if (isEmpty(address)) {
		return res.status(400).json({
			msg: `address should not be empty`,
		});
	}

    
	if (isEmpty(order_email)) {
		return res.status(400).json({
			msg: `email should not be empty`,
		});
	}

	// /* ---------------------  END NULL CHECK ------------------------------- */

	// /* ---------------------  START TYPE CHECK ------------------------------- */

	if (!typeMatch(order_name)) {
		return res.status(400).json({
			msg: `order_name should be alphanumeric text`,
		});
	}

	if (!typeMatch(amount_paid, "number")) {
		return res.status(400).json({
			msg: `amount paid should be number only`,
		});
	}

	if (!typeMatch(items_ordered, "object")) {
		return res.status(400).json({
			msg: `items ordered should be number only`,
		});
	}

	if (!typeMatch(address)) {
		return res.status(400).json({
			msg: `address ordered should be text only`,
		});
	}

    
	if (!typeMatch(order_email)) {
		return res.status(400).json({
			msg: `email ordered should be text only`,
		});
	}


	// /* ---------------------  END TYPE CHECK ------------------------------- */

	req.body = {
		order_name,
		phone_number,
		amount_paid,
		items_ordered,
		address,
		paid_status,
		order_email,
	};
	next();
};

module.exports = { _nullCheckOrder };
