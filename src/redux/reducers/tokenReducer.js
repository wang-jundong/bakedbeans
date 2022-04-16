import { LOADING_UPDATE } from "../constants";

const initialState = {
	isLoading: false,
};

const tokenReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING_UPDATE:
			return {
				...state,
				isLoading: action.payload,
			};

		default:
			return state;
	}
};

export const selectIsLoading = (state) => state.token.isLoading;

export default tokenReducer;
