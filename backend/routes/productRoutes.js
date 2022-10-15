const express = require("express");
const router = express.Router();

// file management
const multer = require('multer');
const upload = multer({});


// controllers
const productCreate = require("../controllers/Product/productCreate").productCreate;
const productDelete = require("../controllers/Product/productDelete").productDelete;
const _singleFileUpload = require("../middlewares/_singleFileUpload")._singleFileUpload;
const insertImage = require("../controllers/Blog/insertImage").insertImage;
const { _allowPublicCORS, _allowPrivateCORS } = require("../middlewares/_corsCheck");
const { _authToken } = require("../middlewares/_authToken");



// product core routes
router.route("/create").post(productCreate);
router.route("/delete").delete(productDelete);
router.route("/upload").post( upload.single('file'), _singleFileUpload, insertImage);

module.exports = router;
