import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { isEmpty, url } from "../../helper";
import customToast from "../blocks/swal/customToast";
import axios from 'axios';
import { isAuthenticated } from "../../auth";

const Loginpage = (props) => {
	const history = useHistory();

	useEffect(() => {
		if (isAuthenticated()) {
			history.push('/blogs');
		} else {
			localStorage.clear();
		}
	}, [])

	// const history = useHistory();
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const usernameChangeHandler = ({ target: { value } }) => {
		setUsername(value);
	};
	const passwordChangeHandler = ({ target: { value } }) => {
		setPassword(value);
	};

	// 'top' | 'top-start' | 'top-end' | 'top-left' | 'top-right' |
	// 'center' | 'center-start' | 'center-end' | 'center-left' | 'center-right' |
	// 'bottom' | 'bottom-start' | 'bottom-end' | 'bottom-left' | 'bottom-right';
	const loginHandler = async () => {
		// e.preventDefault();
		try {
			localStorage.clear();
			const loginResult = await axios.post(url("/auth/login"), {
				username: username,
				password: password,
			});

			if (
				loginResult.status === 200 &&
				loginResult.data.msg === "success"
			) {
				localStorage.setItem(
					"accessToken",
					loginResult.data.accessToken
				);
				localStorage.setItem(
					"refreshToken",
					loginResult.data.refreshToken
				);
				localStorage.setItem("authed", true);
				customToast("success", "Login Successful")
				history.push('/blogs')
			}
		} catch (error) {
			console.error('login error main -->', error.response);
			customToast("error", error.response?.data.msg)
		}
	};

	return (
		<div className="loginwrapper">
			<div className="centerwrapper">
				<div className="centerwrapper__section centerwrapper__adminlogin">
					Admin Login
				</div>
				<div className="centerwrapper__section">
					<input
						type="text"
						onChange={usernameChangeHandler}
						placeholder="Username"
						className="centerwrapper__section__input"
						required={true}
					/>
				</div>
				<div className="centerwrapper__section">
					<input
						type="password"
						onChange={passwordChangeHandler}
						placeholder="Password"
						className="centerwrapper__section__input"
						required={true}
					/>
				</div>
				<div className="centerwrapper__section">
					<button
						className="centerwrapper__section__button"
						type="submit"
						value="submit"
						onClick={loginHandler}
					>
						login
					</button>
				</div>
			</div>
		</div>
	);
};

export default Loginpage;
