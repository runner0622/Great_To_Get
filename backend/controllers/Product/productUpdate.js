const { typeMatch, isEmpty } = require("../../improve/improve");
const ProductModel = require("../../models/product.model")


const productUpdate = async (req, res) => {
	let { 
        title, info, 
        price, discounted_price,
        available_quantity, images,
        video
    }  = req.body;

	/* ---------------------  START NULL CHECK ------------------------------- */
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

    if (isEmpty(images)) {
		return res.status(400).json({
			msg: `product images should not be empty`,
		});
	}



	// /* ---------------------  END NULL CHECK ------------------------------- */



	// /* ---------------------  START TYPE CHECK ------------------------------- */
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
    
    if (!typeMatch(price, 'number')) {
		return res.status(400).json({
			msg: `product price should be number`,
		});
	}

    if (!typeMatch(available_quantity, 'number')) {
		return res.status(400).json({
			msg: `product available_quantity should be number`,
		});
	}


	// /* ---------------------  END TYPE CHECK ------------------------------- */

    if (isEmpty(discounted_price)){
        discounted_price = 0;
    }

    if (isEmpty(images)) {
		images = [];
	}

    if (isEmpty(video)) {
		video = '';
	}


	const px = await ProductModel.updateOne(
        {
            _id: id
        },
        {
            title: title,
            info: info, 
            price: price,
            discounted_price: discounted_price,
            available_quantity: available_quantity,
            images: images,
            video: video
        }
    )


	return res.status(200).json({
        msg: "product updated",
    });
};

module.exports = { productUpdate };
