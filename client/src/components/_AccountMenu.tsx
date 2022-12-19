/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
import { LogoutOptions, User } from "@auth0/auth0-react";
import { Popover, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import { Link } from "react-router-dom";

interface IAccountMenuProps {
	anchorEl: HTMLElement | null;
	open: boolean;
	user: User | undefined;
	logout: (options?: LogoutOptions | undefined) => void;
	handleClose: () => void;
	handleClick: (event: React.MouseEvent<HTMLElement>) => void;
}
export default function AccountMenu(props: IAccountMenuProps) {
	const { anchorEl, open, user, logout, handleClick, handleClose } = props;

	return (
		<>
			<Avatar
				alt="Remy Sharp"
				src={user?.picture}
				sx={{ width: 34, height: 34 }}
				onClick={handleClick}
			/>
			<Popover
				open={Boolean(open)}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				transformOrigin={{ vertical: "top", horizontal: "right" }}
				PaperProps={{
					sx: {
						p: 0,
						mt: 1.5,
						ml: 0.75,
						width: 180,
						"& .MuiMenuItem-root": {
							typography: "body2",
							borderRadius: 0.75,
						},
					},
				}}
			>
				<Box sx={{ my: 1.5, px: 2.5 }}>
					<Typography variant="subtitle2" fontWeight={700} noWrap>
						{user?.email}
					</Typography>
					<Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
						{user?.email}
					</Typography>
				</Box>

				<Divider sx={{ borderStyle: "dashed" }} />

				<Stack sx={{ p: 1 }}>
					{MENU_OPTIONS.map((option) => (
						<Link to={option.link} key={option.label}>
							<MenuItem onClick={handleClose}>{option.label}</MenuItem>
						</Link>
					))}
				</Stack>

				<Divider sx={{ borderStyle: "dashed" }} />

				<MenuItem
					onClick={() => logout({ returnTo: window.location.origin })}
					sx={{ m: 1 }}
				>
					Logout
				</MenuItem>
			</Popover>
		</>
	);
}

const MENU_OPTIONS = [
	// {
	// 	label: "Home",
	// 	icon: "eva:home-fill",
	// },
	{
		label: "Profile",
		link: "/profile",
		icon: "eva:person-fill",
	},
	{
		label: "Settings",
		link: "/setting",
		icon: "eva:settings-2-fill",
	},
];
