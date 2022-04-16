const Button2 = (props) => {
	const { text, isActive, onClick } = props;
	return (
		<>
			{isActive ? (
				<div
					className="text-xl text-center text-white bg-bunting rounded-md py-3 cursor-pointer hover:shadow-2xl shadow-3xl"
					onClick={onClick}
				>
					{text}
				</div>
			) : (
				<div className="bg-gray text-xl text-center rounded-md py-3 opacity-50">
					{text}
				</div>
			)}
		</>
	);
};

export default Button2;
