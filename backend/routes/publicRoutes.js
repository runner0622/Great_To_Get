import express from 'express';
const router = express.Router();

// product public routes
import { productRead, productReadAll } from '../controllers/Product/productRead';

// contact public routes
import  createContact  from '../controllers/Contact/createContact';

// blog public routes
import { blogRead, blogReadAll } from '../controllers/Blog/blogRead';

// order
import  createOrder  from '../controllers/Order/createOrder';
import _nullCheckOrder from '../middlewares/_nullCheckOrder';
import  orderSuccess from '../controllers/Order/orderSuccess';
import  trackOrder from '../controllers/Order/trackOrder';

// sendmail
import _sendMail from '../middlewares/_sendMail';



router.route("/blog/read/:blogID").get(blogRead);
router.route("/blog/read").get(blogReadAll);

router.route("/product/read/:productID").get(productRead);
router.route("/product/read").get(productReadAll);

// contact us post
router.route("/contact/create").post(createContact);

// sendmail
router.route("/sendmail").post(_sendMail);


router.route("/order").post(_nullCheckOrder, createOrder);
router.route("/order/success").post(orderSuccess);
router.route("/order/track").post(trackOrder);


export default router;
