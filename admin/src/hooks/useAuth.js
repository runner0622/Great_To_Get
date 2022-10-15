import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { url } from "../helper";
import { useNavigate } from "react-router";

const authContext = React.createContext();

const refresh = async (refreshToken) => {
	console.log("Refreshing token!");
	const newAccessToken = await axios.post(
		"http://localhost:1000/auth/refreshtoken",
		{ token: refreshToken }
	);
	Cookies.set("accessToken", newAccessToken);
};

const hasAccess = async (accessToken, refreshToken) => {
	if (!refreshToken) return null;

	if (accessToken === undefined) {
		accessToken = await refresh(refreshToken);
		return accessToken;
	}
	return accessToken;
};

const useAuth = () => {
	let [authed, setAuthed] = useState(false);
	const [user, setUser] = useState({});
	const [err, setErr] = useState("");

	const verifyToken = async (accessToken, refreshToken) => {
		console.log(accessToken, refreshToken);
		return new Promise((resolve, reject) => {
			axios
				.post(
					"http://localhost:1000/auth/verify",
					{},
					{ headers: { authorization: `Bearer ${accessToken}` } }
				)
				.then(async (data) => {
					if (data.data.success === false) {
						if (data.data.msg === "User not authenticated") {
							setErr("Login again");
						} else if (data.data.msg === "Access token expired") {
							const accessToken = await refresh(refreshToken);
							return await verifyToken(accessToken, refreshToken);
						}

						resolve(false);
					} else {
						// protected route has been accessed, response can be used.
						setErr("Protected route accessed!");
						resolve(true);
					}
				});
		});
	};


	const login = async () => {
		let accessToken = localStorage.setItem('accessToken', accessToken);
		let refreshToken =  localStorage.setItem('refreshToken', refreshToken);

		const access= await hasAccess(accessToken, refreshToken);

		if (!access) {
            setAuthed(false)
		} else {
            
			const verifedResult = await verifyToken(accessToken, refreshToken);

            if (!verifedResult){
                setAuthed(false)
            }
            setAuthed(true)

		}
	};

	const logout = () => {
		setAuthed(false);
		localStorage.removeItem("accessToken");
		localStorage.removeItem("refreshToken");
	};

	return {
		authed,
		login,
		logout,
	};
};
const AuthProvider = ({ children }) => {
	const auth = useAuth();

	return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const AuthConsumer = () => {
	return useContext(authContext);
};

export { useAuth, AuthProvider, AuthConsumer };
