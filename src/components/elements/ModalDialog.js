import { svgs } from "../../assets/svgs";
import Modal from "react-awesome-modal";
import { useDispatch, useSelector } from "react-redux";
import { selectDialogIsOpen } from "../../redux/reducers/dialogReducer";
import { useEffect } from "react";
import {
	ALERT_UPDATE_DATA,
	ALERT_UPDATE_OPEN,
	DIALOG_UPDATE_OPEN,
} from "../../redux/constants";
import { useWeb3React } from "@web3-react/core";
import { connectors, connectorType } from "../../wallet/connectors";
import { setProvider } from "../utils/StorageUtil";

const ModalDialog = () => {
	const dispatch = useDispatch();
	const { activate } = useWeb3React();

	const isOpen = useSelector(selectDialogIsOpen);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.removeProperty("overflow");
		}
	}, [isOpen]);

	const dismissModal = () => {
		dispatch({
			type: DIALOG_UPDATE_OPEN,
			payload: false,
		});

		// dispatch({ type: ALERT_UPDATE_OPEN, payload: true });
		// dispatch({
		// 	type: ALERT_UPDATE_DATA,
		// 	payload: { severity: "success", message: "How are you?" },
		// });
	};

	const onClickMetamask = () => {
		activate(connectors.injected);
		setProvider(connectorType.injected);
		dismissModal();
	};

	const onClickWalletConnect = () => {
		activate(connectors.walletConnect);
		setProvider(connectorType.walletconnect);
		dismissModal();
	};

	return (
		<Modal visible={isOpen} onClickAway={dismissModal}>
			<div>
				<div
					className="flex flex-col items-center sm:px-6 md:px-10 px-20 py-8 m-2 rounded hover:bg-light-mask cursor-pointer"
					onClick={onClickMetamask}
				>
					<img
						src={svgs.metamask}
						className="w-12 h-12 mb-3"
						alt=""
					/>
					<div className="text-2xl font-semibold text-center">
						MetaMask
					</div>
					<p className="text-lg text-light-gray text-center">
						Connect to your Metamask Wallet
					</p>
				</div>
				<div className="h-px bg-divider opacity-50" />
				<div
					className="flex flex-col items-center sm:px-6 md:px-10 px-20 py-8 m-2 rounded hover:bg-light-mask cursor-pointer"
					onClick={onClickWalletConnect}
				>
					<img
						src={svgs.walletconnect}
						className="w-12 h-12 mb-3"
						alt=""
					/>
					<div className="text-2xl font-semibold text-center">
						WalletConnect
					</div>
					<p className="text-lg text-light-gray text-center">
						Scan with WalletConnect to connect
					</p>
				</div>
			</div>
		</Modal>
	);
};

export default ModalDialog;
