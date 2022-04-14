import { BakedBeansAddress } from "../../data";
import { BakedBeansAbi } from "../../data/abi/BakedBeans";

export const bakedbeansContractInstance = (library) => {
	const bakedbeans = new library.eth.Contract(
		BakedBeansAbi,
		BakedBeansAddress
	);
	return bakedbeans;
};
