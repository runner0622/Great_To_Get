// importing models
const { typeMatch, isEmpty } = require("../../improve/improve");
const ContactModel = require("../../models/contact.model");

// importing logger
const { logger } = require("../../improve/logger");
const log = logger(__filename);


const readAllContact  = async (req, res, next) => {

	try {
		const result = await ContactModel.find({});
		return res.status(200).json({
			msg: result
		});
	} catch (error) {
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_NOTIFICATION_DELETE_01",
			500,
			"NOTIFICATION Delete Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_NOTIFICATION_DELETE_ERROR",
		});
	}
};

module.exports = { readAllContact };
