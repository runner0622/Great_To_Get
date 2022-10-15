import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";

// importing all reducers fro mstore
import { cartReducer } from "./reducers/cartReducer";
import logger from "redux-logger";
const { composeWithDevTools } = require("redux-devtools-extension");

const bindMiddleware = (middleware) => {
    // run only in dev environment
    if (process.env.NEXT_PUBLIC_MODE === "DEV") {
        return composeWithDevTools(applyMiddleware(...middleware));
    }
	return applyMiddleware(...middleware);
};

export const configureStore = () => {
	const store = createStore(
		persistCombineReducers(
			{
				key: "shop",
				storage: storage,
				debug: true,
			},
			{
				shop: cartReducer,
			}
		),
		bindMiddleware([thunk, logger])
	);
	const persistor = persistStore(store);
	return { persistor, store };
};
