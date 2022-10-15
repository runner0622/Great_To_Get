import axios from "axios";
import { isEmpty, url, typeMatch } from "./helper";
import { useHistory } from "react-router-dom";

const isAuthenticated = () => {
	const accessToken = localStorage.getItem("accessToken");
	const refreshToken = localStorage.getItem("refreshToken");

	if (typeof accessToken === "string") {
		return true;
	} else if (refreshToken) {
		localStorage.setItem("authed", false);
		localStorage.setItem("accessToken", null);
		try {
			axios
				.post(url("/auth/verify"), {
					token: accessToken,
				})
				.then((result) => {
					localStorage.setItem(
						"accessToken",
						result.data.accessToken
					);
				})
				.catch((error) => {
					localStorage.setItem("authed", false);
				});
		} catch (errorx) {
			console.log("renewed token error :(");
		}
	}
	return false;
};

export { isAuthenticated }
