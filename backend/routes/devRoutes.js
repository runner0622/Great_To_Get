import express from 'express';
const router = express.Router();

// middlewares
import { _nullCheckLogin } from '../middlewares/_nullCheckLogin';

import { _nullCheckRegister } from '../middlewares/_nullCheckRegister';
import  _sendMail from '../middlewares/_sendMail';
import  _authToken from '../middlewares/_authToken';
import { _roleCheckMember } from '../middlewares/_roleCheckMember';
import { _statusCheck } from '../middlewares/_statusCheck';
import { _log } from '../middlewares/_log';

// const _removeRefreshToken = require("../middlewares/_authToken")._authToken;

// CONTROLLERS
import { deleteOverride } from '../controllers/Dev/deleteOverride';

import { test } from '../controllers/Dev/test';

// --------- DEV ROUTES --------------- //

router
	.route("/superdelete")
	.delete(_authToken, _roleCheckMember, _statusCheck, _log, deleteOverride);

// post route to upload image
router.route("/test").post((req, res, next) => {
	res.send({ msg: "test route was success" });
});

export default router;
