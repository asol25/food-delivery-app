/* eslint-disable arrow-body-style */
import * as React from "react";

interface ICategoriesMenuProps {}

const CategoriesMenu: React.FunctionComponent<ICategoriesMenuProps> = (props) => {
	return (
		<>
			<div className="rounded-lg bg-amber-500 flex items-center justify-center flex-col w-[80px] h-[100px] gap-2">
				<div className="p-2 rounded-full bg-white">
					<img
						className="w-8 h-8 object-contain"
						src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fburger3.png?alt=media&token=0ebe8311-6378-411b-9b6e-d7a6d2a106a2"
						alt=""
					/>
				</div>
				<h6 className="text-base font-semibold text-yellow-50">Burger</h6>
			</div>
		</>
	);
};

export default CategoriesMenu;
