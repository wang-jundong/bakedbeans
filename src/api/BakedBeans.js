import { bakedbeansContractInstance } from "../components/utils/ContractUtils";
import { getRefAddress } from "../components/utils/StorageUtil";
import { LOADING_UPDATE } from "../redux/constants";

export const getBalance = async (active, account, library) => {
	if (!active) return 0;

	let contractBalance = 0;
	try {
		contractBalance = await bakedbeansContractInstance(library)
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

export const getMyEggs = async (active, account, library) => {
	if (!active) return 0;

	let eggs;
	try {
		eggs = await bakedbeansContractInstance(library)
			.methods.getMyEggs(account)
			.call();
	} catch (error) {
		console.log("---err---", error);
	}
	return eggs;
};

export const getBeanRewards = async (active, account, library) => {
	if (!active) return 0;

	let beanRewards = 0;
	try {
		beanRewards = await bakedbeansContractInstance(library)
			.methods.beanRewards(account)
			.call();
	} catch (e) {
		console.log("---err---", e);
	}
	return beanRewards;
};

export const hatchEggs =
	(active, account, library, callback) => async (dispatch) => {
		if (!active) return 0;
		const refAddress = getRefAddress() ? getRefAddress() : account;
		dispatch({ type: LOADING_UPDATE, payload: true });
		await bakedbeansContractInstance(library)
			.methods.hatchEggs(refAddress)
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

export const sellEggs =
	(active, account, library, callback) => async (dispatch) => {
		if (!active) return 0;
		dispatch({ type: LOADING_UPDATE, payload: true });

		await bakedbeansContractInstance(library)
			.methods.sellEggs()
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

export const buyEggs =
	(active, account, library, value, callback) => async (dispatch) => {
		if (!active) return 0;
		dispatch({ type: LOADING_UPDATE, payload: true });

		const refAddress = getRefAddress() ? getRefAddress() : account;
		await bakedbeansContractInstance(library)
			.methods.buyEggs(refAddress)
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
