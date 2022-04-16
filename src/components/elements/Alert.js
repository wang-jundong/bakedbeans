import { useEffect, useRef } from "react";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { ALERT_UPDATE_OPEN } from "../../redux/constants";
import {
	selectAlertData,
	selectAlertIsOpen,
} from "../../redux/reducers/alertReducer";

const MyAlert = () => {
	const dispatch = useDispatch();
	const isOpen = useSelector(selectAlertIsOpen);
	const data = useSelector(selectAlertData);

	const alertRef = useRef(null);

	useEffect(() => {
		if (isOpen) {
			alertRef.current = setTimeout(() => {
				dispatch({ type: ALERT_UPDATE_OPEN, payload: false });
				alertRef.current = null;
			}, 3000);
		}
	}, [isOpen]);

	return (
		<>
			{isOpen && (
				<div className="fixed bottom-8 left-6 sm:right-6 right-auto">
					<Alert severity={data.severity} variant="filled">
						<div
							className="text-md"
							style={{ fontFamily: "Montserrat" }}
						>
							{data.message}
						</div>
					</Alert>
				</div>
			)}
		</>
	);
};

export default MyAlert;
