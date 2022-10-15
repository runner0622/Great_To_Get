const express = require("express");
const router = express.Router();

// controllers
const blogCreate = require("../controllers/Blog/blogCreate").blogCreate;
const blogDelete = require("../controllers/Blog/blogDelete").blogDelete;

// read route for admin
const { xblogRead, xblogReadAll } = require("../controllers/Blog/xblogRead");

router.route("/create").post(blogCreate);
router.route("/delete").delete(blogDelete);

// admin route for reading blog --> for published and unpublished
router.route("/xread/:blogID").get(xblogRead);

// admin route for reading blog --> for published and unpublished
router.route("/xread").get(xblogReadAll);

module.exports = router;
