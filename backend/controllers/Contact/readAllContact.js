// importing models
import { typeMatch, isEmpty } from '../../improve/improve';

import ContactModel from '../../models/contact.model';

// importing logger
import logger from '../../improve/logger';

const log = logger();


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

export { readAllContact };
