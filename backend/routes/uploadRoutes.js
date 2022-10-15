const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({});

// middlewares
const { _authToken } = require("../middlewares/_authToken");
const { _singleFileUpload } = require("../middlewares/_singleFileUpload");
const { insertImage } = require("../controllers/Helpers/insertImage"); 

// post route to upload image
router
	.route("/blog")
	.post(upload.single("image") , _singleFileUpload, insertImage);

router
	.route("/product")
	.post(upload.single("file") , _singleFileUpload, insertImage);

module.exports = router;
