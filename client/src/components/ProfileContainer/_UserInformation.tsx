import { User } from "@auth0/auth0-react";
import * as React from "react";

interface IUserInformationProps {
	user: User | undefined;
	handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserInformation: React.FunctionComponent<IUserInformationProps> = (
	props
) => {
	const { user, handleClick } = props;
	return (
		<>
			<div className="header__wrapper_profile">
				<div className="cols__container">
					<div className="left__col">
						<div className="img__container">
							<img src={user?.picture} alt="Anna Smith" />
							<span />
						</div>
						<h2 className="flex items-center fle-row gap-3 justify-center">
							{user?.name}
							<span
								onClick={handleClick}
								className="bg-[black] text-white text-sm py-1 px-3 rounded-lg cursor-pointer"
							>
								Edit
							</span>
						</h2>
						<p>UX/UI Designer</p>
						<p>{user?.email}</p>

						<ul className="about flex flex-row">
							<li>
								<span>4,073</span>Followers
							</li>
							<li>
								<span>322</span>Following
							</li>
							<li>
								<span>200,543</span>Attraction
							</li>
						</ul>

						<div className="content">
							<p>
								Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
								Aliquam erat volutpat. Morbi imperdiet, mauris ac auctor dictum,
								nisl ligula egestas nulla.
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserInformation;
