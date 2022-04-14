import {
	TOKENS_BALANCE,
	TOKENS_LOADING,
	TOKENS_STAKE_INFORMATIONS,
	TOKENS_STAKE_TO_UNSTAKE,
	TOKENS_UNSTAKE_INFORMATIONS,
	TOKENS_UNSTAKE_TO_STAKE,
	TOKENS_UPDATE_ONE,
} from "../constants";

const initialState = {
	isLoading: false,
	balance: 0,
	tokenIds: [],
	tokenStakeInformations: [],
	tokenUnstakeInformations: [],
};

const tokensReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOKENS_LOADING: {
			return {
				...state,
				isLoading: action.payload,
			};
		}

		case TOKENS_BALANCE: {
			return {
				...state,
				balance: action.payload,
			};
		}

		case TOKENS_STAKE_INFORMATIONS: {
			return {
				...state,
				tokenStakeInformations: action.payload,
			};
		}

		case TOKENS_UNSTAKE_INFORMATIONS: {
			return {
				...state,
				tokenUnstakeInformations: action.payload,
			};
		}

		case TOKENS_STAKE_TO_UNSTAKE: {
			return {
				...state,
				tokenStakeInformations: state.tokenStakeInformations.filter(
					(one) => one.value !== action.payload.value
				),
				tokenUnstakeInformations: [
					...state.tokenUnstakeInformations,
					action.payload,
				],
			};
		}

		case TOKENS_UNSTAKE_TO_STAKE: {
			return {
				...state,
				tokenStakeInformations: [
					...state.tokenStakeInformations,
					action.payload,
				],
				tokenUnstakeInformations: state.tokenUnstakeInformations.filter(
					(one) => one.value !== action.payload.value
				),
			};
		}

		case TOKENS_UPDATE_ONE: {
			return {
				...state,
				tokenInformations: state.tokenStakeInformations.map((one) =>
					one.value === action.payload.value ? action.payload : one
				),
			};
		}

		default:
			return state;
	}
};

export const selectIsLoading = (state) => state.tokens.isLoading;
export const selectBalance = (state) => state.tokens.balance;

export const selectUnstakeTokens = (state) =>
	state.tokens.tokenUnstakeInformations;

export const selectStakeTokensOfWulfz = (state) =>
	state.tokens.tokenStakeInformations.filter((token) => token.mType === "0");
export const selectUnstakeTokensOfWulfz = (state) =>
	state.tokens.tokenUnstakeInformations.filter(
		(token) => token.mType === "0"
	);

export const selectStakeTokensOfPupz = (state) =>
	state.tokens.tokenStakeInformations.filter((token) => token.mType === "1");
export const selectUnstakeTokensOfPupz = (state) =>
	state.tokens.tokenUnstakeInformations.filter(
		(token) => token.mType === "1"
	);

export const selectStakeTokensOfAlpha = (state) =>
	state.tokens.tokenStakeInformations.filter((token) => token.mType === "2");
export const selectUnstakeTokensOfAlpha = (state) =>
	state.tokens.tokenUnstakeInformations.filter(
		(token) => token.mType === "2"
	);

export const selectStakeTokensOfWulfzAndAlpha = (state) =>
	state.tokens.tokenStakeInformations.filter(
		(token) => token.mType === "0" || token.mType === "2"
	);
export default tokensReducer;
