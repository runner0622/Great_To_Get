const AdminModel = require("../../models/admin.model");
const { isEmpty } = require("../../improve/improve");

/*
    DE -> 1
    SE -> 0
    CE -> 2
*/

// importing logger
const { logger } = require("../../improve/logger");
const log = logger(__filename);

const adminRegister = async (req, res, next) => {
	try {
		let { username, password, email } = req.body;
		const usernameMatch = await AdminModel.findOne({
			username: username,
		});

		// username already exists
		if (!isEmpty(usernameMatch)) {
			const MESSAGE = `Admin Username already exists : ${username}`;
			const WARNING = "CE_C_AUTH_ADMIN_REG_01";

			logger.warning(WARNING, 400, MESSAGE);
			return res.status(400).json({
				msg: MESSAGE,
				error: WARNING,
			});
		}

		// !isEmpty(emailCheck) ? already exists email : continue
		const emailCheck = await AdminModel.findOne({
			email: email,
		});
		if (!isEmpty(emailCheck)) {
			const WARNING = "CE_C_AUTH_ADMIN_REG_02";
			const MESSAGE = "Email is linked with another username";

			log.warning(WARNING, 400, MESSAGE);
			return res.status(400).json({
				msg: MESSAGE,
				error: WARNING,
			});
		}

		const admin_user = await AdminModel.find({
			$or: [{ username: username }, { email: email }],
		});

		if (!isEmpty(admin_user) > 0) {
			const WARNING = "CE_C_AUTH_ADMIN_REG_03";
			const MESSAGE = "Username is already registered as admin";

			log.warning(WARNING, 400, MESSAGE);
			return res.status(400).json({
				msg: MESSAGE,
				error: WARNING,
			});
		}

		const new_admin = new AdminModel({
			email: email,
			username: username,
			password: password,
		});
		new_admin.save();

		log.success("Client", "New Admin User Created");
		return res.status(200).json({ msg: "username registered as admin" });
	} catch (error) {
		const ERROR = "SE_C_AUTH_ADMIN_REG_01";

		log.error(ERROR, "dragon", error.message);
		return res.status(500).json({
			msg: "Server Error",
			error: ERROR,
		});
	}
};

module.exports = adminRegister;
