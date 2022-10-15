import { errorData } from "../../data/errors.data";

const ErrorBlock = ({ message }) => {
	return <div className="error-page">{message || errorData.x404}</div>;
};

export default ErrorBlock;
