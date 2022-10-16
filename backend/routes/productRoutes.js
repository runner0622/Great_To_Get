import express from 'express';
const router = express.Router();

// file management
import multer from 'multer';

const upload = multer({});


// controllers
import { productCreate } from '../controllers/Product/productCreate';

import { productDelete } from '../controllers/Product/productDelete';
import { _singleFileUpload } from '../middlewares/_singleFileUpload';
import { insertImage } from '../controllers/Blog/insertImage';
import { _allowPublicCORS, _allowPrivateCORS } from '../middlewares/_corsCheck';
import  _authToken from '../middlewares/_authToken';



// product core routes
router.route("/create").post(productCreate);
router.route("/delete").delete(productDelete);
router.route("/upload").post( upload.single('file'), _singleFileUpload, insertImage);

export default router;
