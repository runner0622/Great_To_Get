import express from 'express';
const router = express.Router();

// controllers
import blogCreate from '../controllers/Blog/blogCreate';

import blogDelete from '../controllers/Blog/blogDelete';

// read route for admin
import { xblogRead, xblogReadAll } from '../controllers/Blog/xblogRead';

router.route("/create").post(blogCreate);
router.route("/delete").delete(blogDelete);

// admin route for reading blog --> for published and unpublished
router.route("/xread/:blogID").get(xblogRead);

// admin route for reading blog --> for published and unpublished
router.route("/xread").get(xblogReadAll);

export default router;
