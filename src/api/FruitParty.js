import { fruitpartyContractInstance } from "../components/utils/ContractUtils";
import { getRefAddress } from "../components/utils/StorageUtil";
import { LOADING_UPDATE } from "../redux/constants";

export const getBalance = async (active, account, library) => {
	if (!active) return 0;

	let contractBalance = 0;
	try {
		contractBalance = await fruitpartyContractInstance(library)
			.methods.getBalance()
			.call();
	} catch (e) {
		console.log("---err---", e);
	}
	return contractBalance;
};

export const getConnectedWalletBalance = async (active, account, library) => {
	if (!active) return 0;

	let balance;
	try {
		balance = await library.eth.getBalance(account);
	} catch (error) {
		console.log("---err---", error);
	}
	return balance;
};

export const getMyFruits = async (active, account, library) => {
	if (!active) return 0;

	let eggs;
	try {
		eggs = await fruitpartyContractInstance(library)
			.methods.getMyFruits(account)
			.call();
	} catch (error) {
		console.log("---err---", error);
	}
	return eggs;
};

export const getFruitRewards = async (active, account, library) => {
	if (!active) return 0;

	let fruitRewards = 0;
	try {
		fruitRewards = await fruitpartyContractInstance(library)
			.methods.fruitRewards(account)
			.call();
	} catch (e) {
		console.log("---err---", e);
	}
	return fruitRewards;
};

export const hatchFruits =
	(active, account, library, callback) => async (dispatch) => {
		if (!active) return 0;
		console.log("---ref bb--", getRefAddress(), account);
		const refAddress = getRefAddress() ? getRefAddress() : account;
		console.log("---ref--", refAddress, account);
		dispatch({ type: LOADING_UPDATE, payload: true });
		await fruitpartyContractInstance(library)
			.methods.hatchFruits(refAddress)
			.send({ from: account })
			.on("receipt", function (receipt) {
				dispatch({ type: LOADING_UPDATE, payload: false });
				callback(true);
			})
			.on("error", function (error) {
				dispatch({ type: LOADING_UPDATE, payload: false });
				callback(false);
			});
	};

export const sellFruits =
	(active, account, library, callback) => async (dispatch) => {
		if (!active) return 0;
		dispatch({ type: LOADING_UPDATE, payload: true });

		await fruitpartyContractInstance(library)
			.methods.sellFruits()
			.send({ from: account })
			.on("receipt", function (receipt) {
				dispatch({ type: LOADING_UPDATE, payload: false });
				callback(true);
			})
			.on("error", function (error) {
				dispatch({ type: LOADING_UPDATE, payload: false });
				callback(false);
			});
	};

export const buyFruits =
	(active, account, library, value, callback) => async (dispatch) => {
		if (!active) return 0;
		dispatch({ type: LOADING_UPDATE, payload: true });

		const refAddress = getRefAddress() ? getRefAddress() : account;
		await fruitpartyContractInstance(library)
			.methods.buyFruits(refAddress)
			.send({
				from: account,
				value: library.utils.toWei(value, "ether"),
			})
			.on("receipt", function (receipt) {
				dispatch({ type: LOADING_UPDATE, payload: false });
				callback(true);
			})
			.on("error", function (error) {
				dispatch({ type: LOADING_UPDATE, payload: false });
				callback(false);
			});
	};
