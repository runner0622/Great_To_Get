import { isEmpty } from '../../improve/improve';

const verifyRefreshToken = async (token) => {
	try {
		const result = await jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        if (isEmpty(result)){
            return true
        }
		return false;
	} catch {
		return false;
	}
};

export default { verifyRefreshToken };
