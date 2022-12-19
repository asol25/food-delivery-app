import { useAuth0 } from "@auth0/auth0-react";
import { Box, ImageList, ImageListItem, Popover } from "@mui/material";
import * as React from "react";
import "../style.css";
import EditProfile from "./ProfileContainer/EditProfile";
import UserInformation from "./ProfileContainer/_UserInformation";

interface IProfileContainerProps {}

const ProfileContainer: React.FunctionComponent<
	IProfileContainerProps
> = () => {
	const { user } = useAuth0();
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
		null
	);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;
	return (
		<>
			<main className="main">
				<div className="grid md:grid-cols-2 my-24">
					<UserInformation user={user} handleClick={handleClick} />
					<ImageList
						sx={{ width: 500, height: 450 }}
						variant="woven"
						cols={3}
						gap={8}
					>
						{itemData.map((item) => (
							<ImageListItem key={item.img}>
								<img
									src={`${item.img}?w=161&fit=crop&auto=format`}
									srcSet={`${item.img}?w=161&fit=crop&auto=format&dpr=2 2x`}
									alt={item.title}
									loading="lazy"
								/>
							</ImageListItem>
						))}
					</ImageList>

					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handleClose}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "left",
						}}
					>
						<Box>
							<EditProfile />
						</Box>
					</Popover>
				</div>
			</main>
		</>
	);
};

const itemData = [
	{
		img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
		title: "Bed",
	},
	{
		img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
		title: "Kitchen",
	},
	{
		img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
		title: "Sink",
	},
	{
		img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
		title: "Books",
	},
	{
		img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
		title: "Chairs",
	},
	{
		img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
		title: "Candle",
	},
	{
		img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
		title: "Laptop",
	},
	{
		img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
		title: "Doors",
	},
	{
		img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
		title: "Coffee",
	},
	{
		img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
		title: "Storage",
	},
	{
		img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
		title: "Coffee table",
	},
	{
		img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
		title: "Blinds",
	},
];

export default ProfileContainer;
