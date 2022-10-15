const express = require('express');
const router = express.Router();

// middlewares
const _nullCheckLogin = require('../middlewares/auth/_nullCheckLogin');

// controllers
const adminLogin = require('../controllers/Auth/adminLogin');
const adminLogout = require('../controllers/Auth/adminLogout');
const adminRegister = require('../controllers/Auth/adminRegister');
const userLogin = require('../controllers/Auth/userLogin');
const userRegister = require('../controllers/Auth/userRegister');

const { renewToken} = require('../controllers/Auth/auth');

// routes
router.route('/login').post(_nullCheckLogin, adminLogin);
router.route('/logout').post(adminLogout);
router.route('/refresh').post(renewToken);
router.route('/register').post(adminRegister);

router.route('/user/login').post(_nullCheckLogin, userLogin);
router.route('/user/register').post(userRegister);

module.exports = router;
