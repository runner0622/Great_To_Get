// importing models
const { typeMatch, isEmpty } = require("../../improve/improve");
const ContactModel = require("../../models/contact.model");

// importing logger
const { logger } = require("../../improve/logger");
const log = logger(__filename);


const deleteContact  = async (req, res, next) => {
	const notificationID = req.body.notificationID;

	if (!typeMatch(notificationID)) {
		return res.status(404).json({
			msg: "Notification ID cannot be empty",
		});
	}

	try {
		const deletedNotification = await ContactModel.deleteOne({ _id: notificationID });

		if (deletedNotification.deletedCount !== 1) {
			return res.status(400).json({
				msg: `Notification with ID ${notificationID} does not exists`,
			});
		}

		return res.status(200).json({
			msg: `Notification with ID ${notificationID} has been deleted`,
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

module.exports = { deleteContact };
