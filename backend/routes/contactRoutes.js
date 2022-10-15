const express = require("express");
const router = express.Router();

const deleteContact = require("../controllers/Contact/deleteContact").deleteContact;
const readAllContact = require("../controllers/Contact/readAllContact").readAllContact;


router.route("/delete").delete(deleteContact);
router.route("/read").get(readAllContact);

module.exports = router;
