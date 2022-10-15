import ACTIONS from "./actions";

function productReducer(state, action) {
	let newState = { ...state };
	switch (action.type) {
        case ACTIONS.PRODUCT_STATE:
            return action.payload;
		case ACTIONS.UPDATE_TITLE:
			newState["title"] = action.payload;
			break;
		case ACTIONS.UPDATE_PRICE:
			newState["price"] = Number(action.payload);
			break;
		case ACTIONS.UPDATE_INFO:
			newState["info"] = action.payload;
			break;
		case ACTIONS.UPDATE_DISCOUNT_PRICE:
			newState["discount_price"] = Number(action.payload);
			break;
		case ACTIONS.UPDATE_AVAILABLE_QUANTITY:
			newState["available_quantity"] = Number(action.payload);
			break;
        case ACTIONS.UPDATE_IMAGES:
            if (typeof action.payload.number === 'number' && 0 <= action.payload.number <= 5){
                newState['images'][action.payload.number] = action.payload.url;
            }
            break;
		default:
			throw new Error();
	}
	return newState;
}

export default productReducer;