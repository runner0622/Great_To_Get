const express = require("express");
const router = express.Router();

// middlewares
const _nullCheckLogin =
	require("../middlewares/_nullCheckLogin")._nullCheckLogin;
const _nullCheckRegister =
	require("../middlewares/_nullCheckRegister")._nullCheckRegister;
const _sendMail = require("../middlewares/_sendMail")._sendMail;

const _authToken = require("../middlewares/_authToken")._authToken;
const _roleCheckMember =
	require("../middlewares/_roleCheckMember")._roleCheckMember;
const _statusCheck = require("../middlewares/_statusCheck")._statusCheck;
const _log = require("../middlewares/_log")._log;
// const _removeRefreshToken = require("../middlewares/_authToken")._authToken;

// CONTROLLERS
const deleteOverride =
	require("../controllers/Dev/deleteOverride").deleteOverride;
const test = require("../controllers/Dev/test").test;

// --------- DEV ROUTES --------------- //

router
	.route("/superdelete")
	.delete(_authToken, _roleCheckMember, _statusCheck, _log, deleteOverride);

// post route to upload image
router.route("/test").post((req, res, next) => {
	res.send({ msg: "test route was success" });
});

module.exports = router;
