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

const productRead = async (req, res, next) => {
	const productID = req.params.productID;

	if (isEmpty(productID)) {
		return res.status(404).json({
			msg: "productID cannot be empty",
		});
	}

	try {
		const readProduct = await ProductModel.findOne({ _id: productID });

		if (isEmpty(readProduct)) {
			return res.status(400).json({
				msg: `Product with productID ${productID} does not exists`,
			});
		}

		const dataObject = {
            id: readProduct._id,
            title: readProduct.title,
            info: readProduct.info,
            price: readProduct.price,
            discount_price: readProduct.discount_price,
            available_quantity: readProduct.available_quantity,
            images: readProduct.images
		};

		return res.status(200).json({
			msg: dataObject,
		});
	} catch (error) {
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_BLOG_READ_01",
			500,
			"BLOG Read Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_BLOG_READ_ERROR",
		});
	}
};


const productReadAll = async (req, res, next) => {

    try{
        const productData = await ProductModel.find();

        if (isEmpty(productData)){
            return res.status(200).json({})
        }else{
            return res.status(200).json(productData);
        }
    }catch (error) {
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_BLOG_READ_ALL_FAILED",
			500,
			"BLOG Read Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_BLOG_READ_ALL_FAILED",
		});
	}
}

module.exports = { productRead, productReadAll};
