import { FruitPartyAddress } from "../../data";
import { FruitPartyAbi } from "../../data/abi/FruitParty";

export const fruitpartyContractInstance = (library) => {
	const fruitparty = new library.eth.Contract(
		FruitPartyAbi,
		FruitPartyAddress
	);
	return fruitparty;
};
