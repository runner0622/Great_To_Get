const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
	_id: {
		type: Schema.ObjectId,
		auto: true,
	},
	contact_name: {
		type: String,
		required: true,
	},
    contact_phone: {
		type: Number,
		required: true,
	},
    contact_email: {
        type: String,
        required: true
    },
    contact_message: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("notification", notificationSchema);
