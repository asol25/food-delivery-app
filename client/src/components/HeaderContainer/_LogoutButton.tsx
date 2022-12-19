/* eslint-disable quotes */
import { LogoutOptions, User } from "@auth0/auth0-react";
import { Badge, styled } from "@mui/material";
import * as React from "react";
import AccountMenu from "../_AccountMenu";

interface ILogoutButtonProps {
	// eslint-disable-next-line no-unused-vars
	logout: (options?: LogoutOptions | undefined) => void;
	user: User | undefined;
}

const LogoutButton: React.FunctionComponent<ILogoutButtonProps> = (props) => {
	const { user, logout } = props;

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<div className="cursor-pointer">
				<StyledBadge
					overlap="circular"
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "right",
					}}
					variant="dot"
				>
					<AccountMenu
						open={open}
						anchorEl={anchorEl}
						handleClick={handleClick}
						handleClose={handleClose}
						user={user}
						logout={logout}
					/>
				</StyledBadge>
			</div>
		</>
	);
};

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0,
		},
	},
}));

export default LogoutButton;
