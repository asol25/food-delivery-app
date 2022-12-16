import * as React from 'react';
import BannerContent from './BannerContent';
import BannerProducts from './_BannerProducts';

interface IBannerContainerProps {}

const BannerContainer: React.FunctionComponent<IBannerContainerProps> = () => {
	return (
		<>
			<div className="my-12 md:grid grid-cols-2">
				<BannerContent />
				<BannerProducts />
			</div>
		</>
	);
};

export default BannerContainer;
