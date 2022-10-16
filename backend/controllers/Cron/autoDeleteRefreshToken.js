import refreshToken from '../../models/refreshToken.model';
import jwt from 'jsonwebtoken';


const verifyRefreshToken = (token) => {
	try {
		jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
		return true;
	} catch {
		return false;
	}
};

const autoDeleteRefreshToken = async (req, res, next) => {
	let tokens = await refreshToken.find();
	try {
		for (const x of tokens) {
			if (!verifyRefreshToken(x.token)) {
				await refreshToken.deleteOne({ _id: x.id });
			}
		}
		return true;
	}catch{
		return false;
	}
};

export default { autoDeleteRefreshToken };
