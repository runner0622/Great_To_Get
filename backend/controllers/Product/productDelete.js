// importing models
const { typeMatch, isEmpty } = require("../../improve/improve");
const ProductModel = require("../../models/product.model");

// importing logger
const { logger } = require("../../improve/logger");
const log = logger(__filename);

/*
    DE -> 0
    SE -> 0
    CE -> 0
*/

const productDelete = async (req, res, next) => {
	const productID = req.body.productID;

	if (!typeMatch(productID)) {
		return res.status(404).json({
			msg: "ProductID cannot be empty",
		});
	}

	try {
		const deletedProduct = await ProductModel.deleteOne({ _id: productID });

		if (deletedProduct.deletedCount !== 1) {
			return res.status(400).json({
				msg: `Product with ID ${productID} does not exists`,
			});
		}

		return res.status(200).json({
			msg: `Product with ID ${productID} has been deleted`,
		});
	} catch (error) {
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_BLOG_DELETE_01",
			500,
			"BLOG Delete Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_BLOG_DELETE_ERROR",
		});
	}
};

module.exports = { productDelete };
