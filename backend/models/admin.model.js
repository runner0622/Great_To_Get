import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const adminSchema = new Schema({
	_id: {
		type: Schema.ObjectId,
		auto: true,
	},
	email: {
		type: String,
		requried: true,
	},
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
    status: {
        type: String,
        required: false,
        default: 'active'
    },
	createTS: {
		type: Number,
		required: false,
		default: Date.now(),
	},
});

export default mongoose.model("admin", adminSchema);
