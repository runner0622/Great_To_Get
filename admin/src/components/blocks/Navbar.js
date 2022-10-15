import React from "react";
import { useState } from "react";
import axios from "axios";
import { url } from "../../helper";
import { Link, useHistory } from "react-router-dom";

const Navbar = (props) => {
	let history = useHistory();

	const logoutHandler = () => {
		localStorage.clear();
        history.push('/');
	};

	return (
		<div className="navbar">
			<div
				className="navbar__logo"
				onClick={() => {
					history.push("/blogs");
				}}
			>
				GreatToGet
			</div>

			<div className="navbar__menu">
				<Link to="/blogs">
					<div
						className="navbar__menu__item"
						onClick={() => {
							history.push("/blogs");
						}}
					>
						Blogs
					</div>
				</Link>


				<Link to="/products">
					<div
						className="navbar__menu__item"
						onClick={() => {
							history.push("/products");
						}}
					>
						Products
					</div>
				</Link>

                <Link to="/orders">
					<div
						className="navbar__menu__item"
						onClick={() => {
							history.push("/orders");
						}}
					>
						Orders
					</div>
				</Link>


				<Link to="/contact">
					<div
						className="navbar__menu__item"
						onClick={() => {
							history.push("/contact");
						}}
					>
						Contact
					</div>
				</Link>

				{/* handle -> admin logout */}
				<div
					className="navbar__menu__item"
					style={{
						backgroundColor: "red",
						color: "white",
					}}
					onClick={logoutHandler}
				>
					Logout
				</div>
			</div>
		</div>
	);
};

export default Navbar;
