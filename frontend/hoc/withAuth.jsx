import LoginBlock from "../components/Block/LoginBlock";
import { isAuthed } from "../helper";

const withAuth = (WrappedComponent) => {
	// eslint-disable-next-line react/display-name
	return (props) =>
		isAuthed() ? <WrappedComponent {...props} /> : <LoginBlock />;
};

export default withAuth;
