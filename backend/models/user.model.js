import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const userSchema = new Schema({
    _id: { 
        type: Schema.ObjectId,
        auto: true 
    },
	username:{
		type: String,
		required: true
	},
	password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
	datejoined: {
		type: Number,
		default: Date.now()
	},
    orders: {
        type: Array,
        default: []
    },
    cart: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        default: 'active'
    }

});


const User = mongoose.model('user', userSchema);
export default User;

