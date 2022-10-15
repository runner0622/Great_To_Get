import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PrivateRoute({ element, path, authed }) {
    
    console.log("authed --> ", authed)

	const ele =
		authed === true ? (
			element
		) : (
			<Navigate to="/login"  />
		);

	return <Route path={path} element={ele} authed={authed}/>;
}

export default PrivateRoute;
