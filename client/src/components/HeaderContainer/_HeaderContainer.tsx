import * as React from 'react';
import LogoHeader from './_LogoHeader';
import NavContainer from './_NavContainer';

interface IHeaderContainerProps {}

const HeaderContainer: React.FunctionComponent<IHeaderContainerProps> = () => {
	const [toggleMenu, setToggleMenu] = React.useState<boolean>(true);

	const handleToggle = () => {
		setToggleMenu(!toggleMenu);
	};
	return (
		<>
			<div className="flex items-center justify-between">
				<LogoHeader />
				<div className="flex items-center gap-x-3">
					<NavContainer handleToggle={handleToggle} toggleMenu={toggleMenu} />
				</div>
			</div>
		</>
	);
};

export default HeaderContainer;
