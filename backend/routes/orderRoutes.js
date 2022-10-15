const express = require("express");
const router = express.Router();

// create notification
const createOrder = require("../controllers/Order/createOrder").createOrder;
const xreadAllOrders = require("../controllers/Order/xreadAllOrders").xreadAllOrders;
const deleteOrder = require("../controllers/Order/deleteOrder").deleteOrder;
const updateOrder = require("../controllers/Order/updateOrder").updateOrder;

router.route("/create").post(createOrder);
router.route("/xread").get(xreadAllOrders);
router.route("/delete").delete(deleteOrder);
router.route("/update").post(updateOrder)


module.exports = router;
