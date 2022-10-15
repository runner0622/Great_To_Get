import "../styles/globals.css";
import UserContext from "../context/UserContext";
import "@fortawesome/fontawesome-svg-core/styles.css";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Meta from "../components/Meta/Meta";
import useWindowDimension from "../hooks/useWindowDimensions";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { configureStore } from "../redux/configureStore";

const { store, persistor } = configureStore();

function MyApp({ Component, pageProps }) {
	const { width } = useWindowDimension();

	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<UserContext.Provider value={{ width }}>
					<Meta />
					<Header />
					<Component {...pageProps} />
					<Footer />
				</UserContext.Provider>
			</PersistGate>
		</Provider>
	);
}

export default MyApp;
