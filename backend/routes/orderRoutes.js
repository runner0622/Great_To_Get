import express from 'express';
const router = express.Router();

// create notification
import  createOrder  from '../controllers/Order/createOrder';

import { xreadAllOrders } from '../controllers/Order/xreadAllOrders';
import { deleteOrder } from '../controllers/Order/deleteOrder';
import { updateOrder } from '../controllers/Order/updateOrder';

router.route("/create").post(createOrder);
router.route("/xread").get(xreadAllOrders);
router.route("/delete").delete(deleteOrder);
router.route("/update").post(updateOrder)


export default router;
