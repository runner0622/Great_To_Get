import ErrorBlock from "../Block/ErrorBlock";
import { errorData } from "../../data/errors.data";

const Error404 = (message) => {
	return <ErrorBlock message={message || errorData.x404} />;
};

export default Error404;
