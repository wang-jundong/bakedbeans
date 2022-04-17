import { LinearProgress } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
	buyEggs,
	getBalance,
	getBeanRewards,
	getConnectedWalletBalance,
	getMyEggs,
	hatchEggs,
	sellEggs,
} from "../../../api/BakedBeans";
import { pngs } from "../../../assets/pngs";
import { decimals } from "../../../data";
import {
	ALERT_UPDATE_DATA,
	ALERT_UPDATE_OPEN,
	DIALOG_UPDATE_OPEN,
} from "../../../redux/constants";
import {
	selectChainId,
	selectIsLoading,
} from "../../../redux/reducers/tokenReducer";
import MyAlert from "../../elements/Alert";
import Button1 from "../../elements/Button1";
import Button2 from "../../elements/Button2";
import Progressbar from "../../elements/Progressbar";
import { setProvider, setRefAddress } from "../../utils/StorageUtil";

const Home = (props) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();
	const { library, chainId, account, activate, deactivate, active } =
		useWeb3React();

	const isLoading = useSelector(selectIsLoading);

	const [contractBalance, setContractBalance] = useState(0);
	const [walletBalance, setWalletBalance] = useState(0);
	const [beanRewards, setBeanRewards] = useState(0);
	const [eggs, setEggs] = useState(0);
	const [buyAmount, setBuyAmount] = useState(0);

	const [flag, setFlag] = useState(0);

	useEffect(() => {
		const refAddress = location.search.substring("?ref=".length);
		if (refAddress) {
			setRefAddress();
		}
	}, []);

	const isAvaxNetwork = () => {
		console.log("---chainId---", chainId);
		if (chainId !== 43113) {
			dispatch({ type: ALERT_UPDATE_OPEN, payload: true });
			dispatch({
				type: ALERT_UPDATE_DATA,
				payload: { severity: "error", message: "Wrong Network" },
			});
			return false;
		}
		return true;
	};

	const referralLink = () => {
		if (active) {
			return (
				window.location.protocol +
				"//" +
				window.location.host +
				"?ref=" +
				account
			);
		} else {
			return "";
		}
	};

	const getContractBalance = async () => {
		const balance = await getBalance(active, account, library);
		if (!balance) return;
		setContractBalance(balance);
	};

	const getWalletBalance = async () => {
		const balance = await getConnectedWalletBalance(
			active,
			account,
			library
		);
		if (!balance) return;
		setWalletBalance(balance);
	};

	const getBeans = async () => {
		const beans = await getBeanRewards(active, account, library);
		if (!beans) return;
		setBeanRewards(beans);
	};

	const getEggs = async () => {
		const eggs = await getMyEggs(active, account, library);
		if (!eggs) return;
		setEggs(eggs);
	};

	const onClickConnect = () => {
		// if (!isAvaxNetwork()) return;
		dispatch({
			type: DIALOG_UPDATE_OPEN,
			payload: true,
		});
	};

	const onClickDisconnect = () => {
		deactivate();
		setProvider(undefined);
	};

	const onClickBakeBeans = () => {
		if (!isAvaxNetwork()) return;
		dispatch(
			buyEggs(active, account, library, buyAmount, (isSuccess) => {
				if (isSuccess) setFlag(flag + 1);
			})
		);
	};

	const onClickRebake = () => {
		if (!isAvaxNetwork()) return;
		dispatch(
			hatchEggs(active, account, library, (isSuccess) => {
				if (isSuccess) setFlag(flag + 1);
			})
		);
	};

	const onClickEatBeans = () => {
		if (!isAvaxNetwork()) return;
		dispatch(
			sellEggs(active, account, library, (isSuccess) => {
				if (isSuccess) setFlag(flag + 1);
			})
		);
	};

	useEffect(() => {
		if (!active) return;
		getContractBalance();
		getWalletBalance();
		getEggs();
		getBeans();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [active, flag]);

	return (
		<div>
			<div className="bg-primary flex flex-row justify-center">
				<div className="sm:w-full sm:px-4 max-w-md">
					<img src={pngs.full_logo} alt="logo" className="w-full" />
					<div className="md:static fixed md:w-full w-40 top-10 right-6 mb-6">
						{active ? (
							<Button1
								text="DISCONNECT"
								isActive={true}
								onClick={onClickDisconnect}
							/>
						) : (
							<Button1
								text="CONNECT"
								isActive={true}
								onClick={onClickConnect}
							/>
						)}
					</div>
					<p className="text-center text-white text-xl">
						The AVAX Reward Pool with the tastiest daily return and
						lowest dev fee
					</p>
					<div className="bg-ivory rounded-2xl shadow-3xl mt-5">
						<div className="px-3">
							{isLoading && <Progressbar />}
						</div>
						<div className="px-6 py-8 mt-8">
							<div className="flex justify-between items-center mb-6">
								<div className="text-xl">Contract</div>
								<div className="text-2xl font-medium">{`${(
									contractBalance / decimals
								).toFixed(3)} AVAX`}</div>
							</div>
							<div className="flex justify-between items-center mb-6">
								<div className="text-xl">Wallet</div>
								<div className="text-2xl font-medium">{`${(
									walletBalance / decimals
								).toFixed(3)} AVAX`}</div>
							</div>
							<div className="flex justify-between items-center mb-6">
								<div className="text-xl">Your FRUITS</div>
								<div className="text-2xl font-medium">{`${eggs} FRUITS`}</div>
							</div>
							<div className="border border-black bg-white px-5 py-3 font-medium flex flex-row items-center text-2xl">
								<input
									type="number"
									className="w-full outline-none text-right font-medium"
									value={buyAmount}
									onChange={(event) =>
										setBuyAmount(event.target.value)
									}
								></input>
								<div className="ml-4">AVAX</div>
							</div>
							<div className="mt-6">
								<Button2
									text="BAKE FRUITS"
									isActive={active && !isLoading && buyAmount}
									onClick={onClickBakeBeans}
								/>
							</div>
							<div className="h-px bg-divider my-6" />
							<div className="flex justify-between items-center">
								<div className="text-2xl">Your Rewards</div>
								<div className="text-2xl">{`${(
									beanRewards / decimals
								).toFixed(3)} AVAX`}</div>
							</div>
							<div className="flex items-center text-lg gap-x-4 mt-6">
								<Button1
									text="RE-BAKE"
									isActive={active && !isLoading}
									onClick={onClickRebake}
								/>
								<Button1
									text="EAT FRUITS"
									isActive={active && !isLoading}
									onClick={onClickEatBeans}
								/>
							</div>
						</div>
					</div>
					<div className="bg-ivory rounded-2xl shadow-3xl px-6 py-4 mt-8">
						<div className="text-2xl">Nutrition Facts</div>
						<div className="h-1 bg-bunting mt-4"></div>
						<div className="flex items-center justify-between mt-4 text-xl">
							<div>Daily Return</div>
							<div>8%</div>
						</div>
						<div className="flex items-center justify-between mt-4 text-xl">
							<div>APR</div>
							<div>2,920%</div>
						</div>
						<div className="flex items-center justify-between mt-4 mb-2 text-xl">
							<div>Dev Fee</div>
							<div>10%</div>
						</div>
					</div>
					<div className="bg-ivory rounded-2xl shadow-3xl px-6 py-4 mt-8">
						<div className="text-2xl">Referral Link</div>
						<div className="border border-black bg-white px-4 py-2 font-medium flex flex-row items-center mt-4">
							<input
								type="text"
								className="w-full outline-none font-medium bg-white"
								value={referralLink()}
								disabled
							></input>
						</div>
						<div className="text-lg text-center mt-4 mb-2">
							Earn 12% of the AVAX used to bake fruits from anyone
							who uses your referral link
						</div>
					</div>
					<div className="my-12 flex items-center justify-center gap-x-4">
						<a href="#">
							<img
								src={pngs.bscscan}
								className="w-12 h-12 cursor-pointer"
								alt=""
							/>
						</a>
						<a href="#">
							<img
								src={pngs.telegram}
								className="w-12 h-12 cursor-pointer"
								alt=""
							/>
						</a>
						<a href="#">
							<img
								src={pngs.twitter}
								className="w-12 h-12 cursor-pointer"
								alt=""
							/>
						</a>
					</div>
				</div>
			</div>
			<MyAlert />
		</div>
	);
};

export default Home;
