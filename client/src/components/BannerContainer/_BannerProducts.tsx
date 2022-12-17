import * as React from "react";

interface IBannerProductsProps {}

const BannerProducts: React.FunctionComponent<IBannerProductsProps> = () => (
	<>
		<div className="w-full h-full my-4 flex items-center justify-center lg:px-32 py-4 gap-4 flex-wrap banner_products">
			<div className="lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col items-center justify-center drop-shadow-lg">
				<img
					src="https://freesvg.org/storage/img/thumb/icecream-2221064.png"
					className="w-20 lg:w-40 -mt-10 lg:-mt-20"
					alt="I1"
				/>
				<p className="text-base lg:text-xl font-semibold text-textColor mt-2 lg:mt-4">Icecream</p>
				<p className="text-[12px] lg:text-sm text-lighttextGray font-semibold my-1 lg:my-3">
					Chocolate &amp; vanilla
				</p>
				<p className="text-sm font-semibold text-headingColor">
					<span className="text-xs text-red-600">$</span> 8.25
				</p>
			</div>
		</div>
	</>
);

export default BannerProducts;
