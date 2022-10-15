const { typeMatch, isEmpty } = require("../../improve/improve");
const ProductModel = require("../../models/product.model");

const productCreate = async (req, res) => {
	let {
		id,
		title,
		info,
		price,
		discount_price,
		available_quantity,
		images,
		video,
	} = req.body;

	/* ---------------------  START NULL CHECK ------------------------------- */

	if (isEmpty(id)) {
		return res.status(400).json({
			msg: `product ID should not be empty`,
		});
	}

	if (isEmpty(title)) {
		return res.status(400).json({
			msg: `product title should not be empty`,
		});
	}

	if (isEmpty(info)) {
		return res.status(400).json({
			msg: `product info should not be empty`,
		});
	}

	if (isEmpty(price)) {
		return res.status(400).json({
			msg: `product price should not be empty`,
		});
	}

	if (isEmpty(available_quantity)) {
		return res.status(400).json({
			msg: `product available_quantity should not be empty`,
		});
	}

	// /* ---------------------  END NULL CHECK ------------------------------- */

	// /* ---------------------  START TYPE CHECK ------------------------------- */

	if (!typeMatch(id)) {
		return res.status(400).json({
			msg: `product ID should be alphanumeric sequence`,
		});
	}

	if (!typeMatch(title)) {
		return res.status(400).json({
			msg: `product title should be alphanumeric sequence`,
		});
	}

	if (!typeMatch(info)) {
		return res.status(400).json({
			msg: `product info should be alphanumeric sequence`,
		});
	}

	if (!typeMatch(price, "number")) {
		return res.status(400).json({
			msg: `product price should be number`,
		});
	}

	if (!typeMatch(available_quantity, "number")) {
		return res.status(400).json({
			msg: `product available_quantity should be number`,
		});
	}

	// /* ---------------------  END TYPE CHECK ------------------------------- */

	if (isEmpty(discount_price)) {
		discount_price = 0;
	}

	if (isEmpty(video)) {
		video = "";
	}

	const findRes = await ProductModel.findById({ _id: id });

	if (isEmpty(findRes)) {
		const new_product = new ProductModel({
			_id: id,
			title: title,
			info: info,
			price: price,
			discount_price: discount_price,
			available_quantity: available_quantity,
			images: images,
			video: video,
		});
		const res_save = await new_product.save();
		return res.status(200).json({
			id: res_save._id,
			msg: "new product added",
			title: title,
			info: info,
			price: price,
			discount_price: discount_price,
			available_quantity: available_quantity,
			images: images,
			video: video,
		});
	} else {
		try {
			const findProduct = await ProductModel.findById({ _id: id });

			if (isEmpty(findProduct)) {
				return res.status(400).json({
					msg: `Product with ID ${id} does not exists`,
				});
			}

			const updatedProduct = await ProductModel.updateOne(
				{ _id: id },
				{
					title: title,
					info: info,
					price: price,
					discount_price: discount_price,
					available_quantity: available_quantity,
					images: images,
					video: video,
				}
			);

			if (updatedProduct.nModified !== 1) {
				return res.status(400).json({
					_id: id,
					title: title,
					info: info,
					price: price,
					discount_price: discount_price,
					available_quantity: available_quantity,
					images: images,
					video: video,
					msg: `Product with ID ${id} was already updated`,
				});
			}

			return res.status(200).json({
				id: id,
				title: title,
				info: info,
				price: price,
				discount_price: discount_price,
				available_quantity: available_quantity,
				images: images,
				video: video,
				msg: `Product with ID ${id} was updated`,
			});
		} catch (error) {
			const [ERROR, STATUS, MESSAGE] = [
				"SE_PRODUCT_UPDATE_ERROR",
				500,
				"PRODUCT Update Failed",
			];

			log.error(ERROR, STATUS, "dragon", MESSAGE);
			return res.status(STATUS).json({
				msg: "Server Error",
				error: "SE_PRODUCT_UPDATE_ERROR",
			});
		}
	}
};

module.exports = { productCreate };
