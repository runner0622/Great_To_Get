// importing models
import { deleteOne } from "../../models/admin.model";
import { isEmpty, typeMatch } from "../../improve/improve";

// importing logger
import logger from "../../improve/logger";
const log = logger();

/*
    DE -> 1
    SE -> 0
    CE -> 2
*/

const adminDelete = async (req, res, next) => {
	const { username, password } = req.body;
	if (!typeMatch(username) || !typeMatch(password)) {
		return res.status(404).json({
			msg: `arguments apikey, id, password needs to be string type`,
		});
	}

	try {
		const deletedUser = await deleteOne(
			{ username: username },
			{ status: "deleted" }
		);

		if (deletedUser.deletedCount !== 1) {
			return res.status(400).json({
				msg: `Admin Username ${username} does not exists`,
			});
		}

		return res.status(200).json({
			msg: `Username ${username} has been deleted`,
		});
	} catch (error) {
		const [ERROR, STATUS, MESSAGE] = [
			"SE_AUTH_ADMIN_DELETE_01",
			500,
			"Admin Delete Failed",
		];

		log.error(ERROR, STATUS, "dragon", MESSAGE);
		return res.status(STATUS).json({
			msg: "Server Error",
			error: "SE_ADMIN_DELETE_ERROR",
		});
	}
};

export default { adminDelete };
