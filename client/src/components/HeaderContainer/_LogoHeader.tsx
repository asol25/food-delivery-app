import * as React from "react";
import { Link } from "react-router-dom";

interface ILogoHeaderProps {}

const LogoHeader: React.FunctionComponent<ILogoHeaderProps> = () => (
	<>
		<div className="flex items-center">
			<h3 className="uppercase text-xl cursor-pointer font-semibold">
				<Link to="/">food</Link>
			</h3>
		</div>
	</>
);

export default LogoHeader;
