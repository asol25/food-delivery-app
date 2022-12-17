import * as React from "react";

interface IBannerContentProps {}

const BannerContent: React.FunctionComponent<IBannerContentProps> = () => (
	<>
		<div>
			<div className=" bg-orange-100 px-4 py-1 rounded-full w-44">
				<p className="text-base text-orange-500 font-semibold">Bike Delivery</p>
			</div>
			<h1 className="text-[2.5rem] lg:text-[4.5rem] font-bold tracking-wide text-headingColor my-8">
				The Fastest Delivery in
				<span className="text-orange-600 text-[3rem] lg:text-[5rem]">Your City</span>
			</h1>
			<p className="text-base font-medium text-textColor text-center md:text-left md:w-[80%]">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Minima velit eaque fugit
				distinctio est nam voluptatum architecto, porro iusto deserunt recusandae ipsa minus eos
				sunt, dolores illo repellat facere suscipit!
			</p>

			<button
				type="button"
				className="my-8 bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2  rounded-lg hover:shadow-lg transition-all ease-in-out duration-100"
			>
				Order Now
			</button>
		</div>
	</>
);

export default BannerContent;
