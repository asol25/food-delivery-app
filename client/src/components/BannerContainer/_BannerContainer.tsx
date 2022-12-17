import * as React from 'react';
import BannerContent from './_BannerContent';
import BannerProducts from './_BannerProducts';
import HeroBanner from '../../img/heroBg.png';

interface IBannerContainerProps {}

const BannerContainer: React.FunctionComponent<IBannerContainerProps> = () => {
	return (
		<>
			<div className="my-12 md:grid grid-cols-2">
				<BannerContent />
				<div className="py-2 flex-1 flex items-center relative min-h-[430px]">
					<img
						className="absolute top-0 left-0 md:left-2/4 h-420 md:h-[500px] min-h-96 lg:w-auto"
						src={HeroBanner}
						alt="banner_bg"
					></img>
					<BannerProducts />
				</div>
			</div>
		</>
	);
};

export default BannerContainer;
