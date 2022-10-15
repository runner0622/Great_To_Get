const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
	_id: {
		type: Schema.ObjectId,
		auto: true,
	},
	order_email: {
		type: String,
		required: true,
	},
	order_name: {
		type: String,
		required: true,
	},
	amount_paid: {
		type: Number,
		required: true,
	},
	phone_number: {
		type: Number,
		required: true,
	},
	items_ordered: {
		type: Object,
		required: false,
	},
	paid_status: {
		type: Boolean,
		required: false,
		default: false,
	},
	address: {
		type: String,
		required: false,
	},
	track: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model("order", orderSchema);
