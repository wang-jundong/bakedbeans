import { DIALOG_UPDATE_OPEN } from "../constants";

const initialState = {
	isOpen: false,
};

const dialogReducer = (state = initialState, action) => {
	switch (action.type) {
		case DIALOG_UPDATE_OPEN:
			return {
				...state,
				isOpen: action.payload,
			};

		default:
			return state;
	}
};

export const selectDialogIsOpen = (state) => state.dialog.isOpen;

export default dialogReducer;
