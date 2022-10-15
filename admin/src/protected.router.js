import axios from "axios";
import React, { useRef, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./auth";
import { url, isEmpty } from "./helper";

export const ProtectedRoute = ({ component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) => {

				if (isAuthenticated()) {
					return <Component {...props} />;
				} else {
					return (
						<Redirect
							to={{
								pathname: "/",
								state: {
									from: props.location,
								},
							}}
						/>
					);
				}
			}}
		/>
	);
};
