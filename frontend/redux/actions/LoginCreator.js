import * as ActionTypes from "./ActionTypes";

export const addLogin = (loginPayload) => ({
	type: ActionTypes.ADD_LOGIN,
	user: loginPayload,
});

export const loginLoading = () => ({
	type: ActionTypes.LOGIN_LOADING,
});

export const loginFailed = (errMess) => ({
	type: ActionTypes.LOGIN_FAILED,
	payload: errMess,
});

export const removeLogin = () => ({
	type: ActionTypes.REMOVE_LOGIN,
	user: {},
});

export const renewAccessToken = (accessToken) => ({
	type: ActionTypes.RENEW_ACCESS_TOKEN,
	payload: accessToken,
});

export const setAccessToken = (accessToken) => ({
	type: ActionTypes.SET_ACCESS_TOKEN,
	payload: accessToken,
});

export const removeUserPaste = (id) => ({
    type: ActionTypes.REMOVE_USER_PASTE,
    payload: id
})

export const addUserPaste = (id) => ({
    type: ActionTypes.ADD_USER_PASTE,
    payload: id
})

