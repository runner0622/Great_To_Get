import axios from "axios";
import React, { useEffect, useState } from "react";

import Blogpage from "./components/pages/Blogpage";
import Loginpage from "./components/pages/Loginpage";
import Editorpage from "./components/pages/Editorpage";
import x404 from "./components/pages/x404";
import { ProtectedRoute } from "./protected.router";
import Productpage from "./components/pages/Productpage";
import TestPage from "./components/pages/TestPage";
import ContactPage from "./components/pages/Contactpage";
import OrderPage from "./components/pages/Orderpage";
import { Switch, Route, useHistory } from "react-router-dom";
import NewProduct from "./components/pages/NewProduct";
import { SERVER, MODE } from "./helper";

// env config

function App(props) {
	if (MODE === "DEV") {
        console.log('mode -->', MODE);
		console.log("BACKEND SERVER --> ", SERVER);
	}
	return (
		<div className="App">
			<Switch>
				{/* pattern for base route */}
				<Route exact path="/" component={Loginpage} />
				<Route exact path="/test" component={TestPage} />

				{/* pattern for protected routes */}
				<ProtectedRoute exact path="/blogs" component={Blogpage} />
				<ProtectedRoute
					exact
					path="/blogs/:blogID?"
					component={Editorpage}
				/>
				<ProtectedRoute exact path="/contact" component={ContactPage} />
				<ProtectedRoute
					exact
					path="/products"
					component={Productpage}
				/>
				<ProtectedRoute
					exact
					path="/products/:productID?"
					component={NewProduct}
				/>
				<ProtectedRoute exact path="/orders" component={OrderPage} />

				{/* pattern for unknown routes */}
				<Route path="*" component={x404} />
			</Switch>
		</div>
	);
}

export default App;
