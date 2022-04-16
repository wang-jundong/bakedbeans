import { ALERT_UPDATE_DATA, ALERT_UPDATE_OPEN } from "../constants";

const initialState = {
	isOpen: false,
	data: {},
};

const alertReducer = (state = initialState, action) => {
	switch (action.type) {
		case ALERT_UPDATE_OPEN:
			return {
				...state,
				isOpen: action.payload,
			};

		case ALERT_UPDATE_DATA:
			return {
				...state,
				data: action.payload,
			};

		default:
			return state;
	}
};

export const selectAlertIsOpen = (state) => state.alert.isOpen;
export const selectAlertData = (state) => state.alert.data;

export default alertReducer;
