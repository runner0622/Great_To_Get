const express = require('express');
const router = express.Router();

// create notification
const deleteContact = require("../controllers/Contact/deleteContact").deleteContact;
const readAllContact = require("../controllers/Contact/readAllContact").readAllContact;

// public route for reading blog --> only published
router.route("/contact/delete").delete(deleteContact);
router.route("/contact/read").get(readAllContact);

module.exports = router;
