import express from 'express';
const router = express.Router();

import multer from 'multer';
const upload = multer({});

// middlewares
import  _authToken from '../middlewares/_authToken';

import { _singleFileUpload } from '../middlewares/_singleFileUpload';
import { insertImage } from '../controllers/Helpers/insertImage';

// post route to upload image
router
	.route("/blog")
	.post(upload.single("image") , _singleFileUpload, insertImage);

router
	.route("/product")
	.post(upload.single("file") , _singleFileUpload, insertImage);

export default router;
