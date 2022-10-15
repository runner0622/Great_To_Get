const ContactModel = require("../../models/contact.model");
const { typeMatch, isEmpty } = require("../../improve/improve");
const { randomHash } = require("../../improve/encryption");

const createContact = async (req, res, next) => {
	const { contact_name, contact_phone, contact_message, contact_email } = req.body ?? {};
	/* ---------------------  START NULL CHECK ------------------------------- */


    const PAY = {
        contact_name: contact_name,
        contact_phone: contact_phone,
        contact_message: contact_message,
        contact_email: contact_email
    };

    console.log(PAY)

	if (isEmpty(contact_name)) {
		return res.status(400).json({
			msg: `contact name should not be empty`,
		});
	}

	if (isEmpty(contact_message)) {
		return res.status(400).json({
			msg: `contact message should not be empty`,
		});
	}

	if (isEmpty(contact_phone)) {
		return res.status(400).json({
			msg: `contact phone should not be empty`,
		});
	}

	if (isEmpty(contact_email)) {
		return res.status(400).json({
			msg: `contact phone should not be empty`,
		});
	}

	// /* ---------------------  END NULL CHECK ------------------------------- */

	// /* ---------------------  START TYPE CHECK ------------------------------- */

	if (!typeMatch(contact_name)) {
		return res.status(400).json({
			msg: `contact name should be alphanumeric text`,
		});
	}

	if (!typeMatch(contact_message)) {
		return res.status(400).json({
			msg: `contact info should be text only`,
		});
	}

	if (!typeMatch(contact_phone, "number")) {
		return res.status(400).json({
			msg: `contact number should be number only`,
		});
	}

	if (!typeMatch(contact_email)) {
		return res.status(400).json({
			msg: `contact number should be email only`,
		});
	}
	// /* ---------------------  END TYPE CHECK ------------------------------- */

	const PAYLOAD = {
		contact_name,
		contact_message,
		contact_phone,
		contact_email,
	};

	const newNotify = new ContactModel(PAYLOAD);
	try {
		const res_save = await newNotify.save();
		if (isEmpty(res_save._id)) {
			return res.status(400).json({
				msg: "unable to send message",
			});
		}

		return res.status(200).json({
			id: res_save.id,
			msg: "thank you for contacting",
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			msg: "unable to send message",
		});
	}
};

module.exports = { createContact };
