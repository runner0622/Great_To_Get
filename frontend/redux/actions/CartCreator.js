import * as ActionTypes from "./ActionTypes";

// add single item
export const addSingleItemToCart = (payload) => ({
	type: ActionTypes.CARD_ADD_SINGLE_ITEM,
	payload: payload,
});

// increase quantity of item
export const incrementItemToCart = (payload) => ({
	type: ActionTypes.CART_INCREMENT_ITEM,
	payload: payload,
});

// decrement quantity of item
export const decrementItemToCart = (payload) => ({
	type: ActionTypes.CART_DECREMENT_ITEM,
	payload: payload,
});

// remove item
export const removeItemFromCart = (payload) => ({
	type: ActionTypes.CART_REMOVE_ITEM,
	payload: payload,
});

// clear item
export const clearItemFromCart = () => ({
	type: ActionTypes.CART_CLEAR,
});


// clear item
export const pushRecentOrder = (payload) => ({
	type: ActionTypes.PUSH_RECENT_ORDER,
    payload: payload,
});


export const recentUpdatedTimestamp = (id) => ({
    type: ActionTypes.RECENT_UPDATED_TIMESTAMP,
})
