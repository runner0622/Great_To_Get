const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
	_id: {
		type: Schema.ObjectId,
		auto: true,
	},
	title: {
		type: String,
		required: true,
	},
    info: {
		type: String,
		required: false,
	},
    price: {
        type: Number,
        required: true
    },
    discount_price: {
        type: Number,
        required: false
    },
    available_quantity: {
        type: Number,
        required: false
    },
    images: {
        type: Array,
        required: false,
        default: ["", "", "", ""]
    },
    video: {
        type: String,
        required: false
    },
	create_ts: {
		type: Number,
		required: false,
		default: Date.now(),
	},
});

module.exports = mongoose.model("product", productSchema);
