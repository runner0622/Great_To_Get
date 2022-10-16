import express from 'express';
const router = express.Router();

// middlewares
import _nullCheckLogin from '../middlewares/auth/_nullCheckLogin';

// controllers
import adminLogin from '../controllers/Auth/adminLogin';

import adminLogout from '../controllers/Auth/adminLogout';
import adminRegister from '../controllers/Auth/adminRegister';
import userLogin from '../controllers/Auth/userLogin';
import userRegister from '../controllers/Auth/userRegister';
import { renewToken } from '../controllers/Auth/auth';

// routes
router.route('/login').post(_nullCheckLogin, adminLogin);
router.route('/logout').post(adminLogout);
router.route('/refresh').post(renewToken);
router.route('/register').post(adminRegister);

router.route('/user/login').post(_nullCheckLogin, userLogin);
router.route('/user/register').post(userRegister);

export default router;
