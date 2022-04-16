const Button1 = (props) => {
	const { text, isActive, onClick } = props;

	return (
		<>
			{isActive ? (
				<div
					className="hover:bg-dark-yellow bg-yellow hover:shadow-2xl shadow-3xl rounded-md py-3 flex-1 text-center cursor-pointer"
					onClick={onClick}
				>
					{text}
				</div>
			) : (
				<div className="bg-gray py-3 flex-1 text-center rounded-md opacity-50">
					{text}
				</div>
			)}
		</>
	);
};

export default Button1;
