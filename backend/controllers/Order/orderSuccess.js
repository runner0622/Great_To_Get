const orderModel = require("../../models/order.model");

const orderSuccess = async (req, res, next) => {
	const order_id = req.body.order_id ?? "";

	const response = await orderModel.updateOne(
		{
			_id: order_id,
		},
		{
			paid_status: true,
            track: "order created"
		}
	);

	if (response.nModified === 1){
        res.status(200).json({
            msg: "payment successful",
            order_id: order_id,
            success: true
        });
    }else{
        res.status(200).json({
            msg: "payment failed",
            success: false
        });
    }

	
};

module.exports = { orderSuccess };
