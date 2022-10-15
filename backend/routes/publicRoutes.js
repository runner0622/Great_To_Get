const express = require("express");
const router = express.Router();


// product public routes
const productRead = require("../controllers/Product/productRead").productRead;
const productReadAll =
	require("../controllers/Product/productRead").productReadAll;
router.route("/product/read/:productID").get(productRead);
router.route("/product/read").get(productReadAll);


// blog public routes
// only published blogs are fetched
const { blogRead, blogReadAll } = require("../controllers/Blog/blogRead");
router.route("/blog/read/:blogID").get(blogRead);
router.route("/blog/read").get(blogReadAll);

// contact us post
const createContact =
	require("../controllers/Contact/createContact").createContact;
router.route("/contact/create").post(createContact);

// sendmail
const { _sendMail } = require("../middlewares/_sendMail");
router.route("/sendmail").post(_sendMail);

// order
const { createOrder } = require("../controllers/Order/createOrder");
const { _nullCheckOrder } = require("../middlewares/_nullCheckOrder");
const { orderSuccess } = require("../controllers/Order/orderSuccess");
const { trackOrder } = require("../controllers/Order/trackOrder");

router.route("/order").post(_nullCheckOrder, createOrder);
router.route("/order/success").post(orderSuccess);
router.route("/order/track").post(trackOrder);


module.exports = router;
