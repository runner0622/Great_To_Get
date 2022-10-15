const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { randomHash } = require("../improve/encryption");

const blogSchema = new Schema({
	_id: {
		type: String,
		requied: true,
	},
	title: {
		type: String,
		required: true,
	},
	short_info: {
		type: String,
		required: true,
        default: ""
	},
	data: {
		type: Object,
		default: {
			time: Date.now(),
			blocks: [
				{
					id: randomHash(10, 2),
					type: "paragraph",
					data: {},
				},
			],
			version: "2.22.2",
		},
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	published_status: {
		type: Boolean,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	header_image: {
		type: String,
		required: true,
	},
	create_ts: {
		type: Number,
		required: false,
		default: Date.now(),
	},
	published_time: {
		type: Number,
		required: false,
		default: Date.now(),
	},
});

module.exports = mongoose.model("blog", blogSchema);
