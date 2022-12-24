import * as React from "react";
import BannerContent from "./_BannerContent";
import BannerProducts from "./_BannerProducts";

interface IBannerContainerProps {}

const BannerContainer: React.FunctionComponent<IBannerContainerProps> = () => (
	<>
		<div className="my-12 md:grid md:grid-cols-2 flex flex-col-reverse mx-auto">
			<BannerContent />
			<BannerProducts />
		</div>
	</>
);

export default BannerContainer;
