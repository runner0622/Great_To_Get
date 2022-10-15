import ACTIONS from "./actions";

function blogReducer(state, action) {
	let newState = { ...state };
	switch (action.type) {
		case ACTIONS.BLOG_UPDATE_TITLE:
			newState["title"] = action.payload;
			break;
		case ACTIONS.BLOG_UPDATE_AUTHOR:
			newState["author"] = action.payload;
			break;
        case ACTIONS.BLOG_UPDATE_STATUS:
            newState["published_status"] =  !action.payload;
            break;
        case ACTIONS.BLOG_UPDATE_HEADER_IMAGE:
            newState["header_image"] =  action.payload;
            break;
        case ACTIONS.BLOG_SHOW_SETTING:
            newState["show_setting"] =  action.payload;
            localStorage.setItem("show_setting", Boolean(action.payload));
            break;
        case ACTIONS.BLOG_UPDATE_CATEGORY:
            newState["category"] =  action.payload;
            break;
        case ACTIONS.BLOG_UPDATE_PUBLISHED_TIME:
            newState["published_time"] =  action.payload;
            break;
        case ACTIONS.BLOG_UPDATE_SHORT_INFO:
            newState["short_info"] = action.payload
		default:
			return newState
	}
	return newState;
}

export default blogReducer;