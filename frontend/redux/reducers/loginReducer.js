import * as ActionTypes from "../actions/ActionTypes";
import { renewAccessToken } from "../../../helper";
import produce from "immer";

export const loginReducer = (
	state = { isLoading: false, errMess: null, user: {} },
	action
) => {
	switch (action.type) {
		case ActionTypes.ADD_LOGIN:
			return produce(state, (draft) => {
				draft.user = action.user;
			});

		case ActionTypes.LOGIN_LOADING:
			return produce(state, (draft) => {
				draft.isLoading = true;
			});

		case ActionTypes.LOGIN_FAILED:
			return produce(state, (draft) => {
				draft.errMess = action.errMess;
				draft.user = {};
			});

		case ActionTypes.REMOVE_LOGIN:
			return produce(state, (draft) => {
				draft.user = action.user;
			});

		// setter method for updating accessToken
		case ActionTypes.SET_ACCESS_TOKEN:
			return produce(state, (draft) => {
				draft.user.accessToken = action.payload;
			});

		case ActionTypes.REMOVE_USER_PASTE:
			return produce(state, (draft) => {
				// filter function for paste
				draft.user.pastes = draft.user.pastes.filter(
					(paste) => paste.id !== action.payload
				);
			});

		case ActionTypes.ADD_USER_PASTE:
			return produce(state, (draft) => {
				draft.user.pastes.push(action.payload);
			});

		default:
			return state;
	}
};
