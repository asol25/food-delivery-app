import PropTypes from "prop-types";
import * as React from "react";
// @mui
import {
	Box,
	Card,
	Container,
	Divider,
	Link,
	List,
	ListItem,
	Stack,
	Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
// utils
import Rating from "@mui/material/Rating";
// components
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import Label from "../../../components/label";
import { fCurrency } from "../../../utils/formatNumber";
import EditProduct from "./EditProduct";
import HistoryOrder from "./HistoryOrder";

// ----------------------------------------------------------------------

const StyledProductImg = styled("img")({
	top: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	position: "absolute",
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
	product: PropTypes.object,
	setProducts: PropTypes.func.isRequired,
	products: PropTypes.array.isRequired,
};

export default function ShopProductCard({ product, setProducts, products }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const idOpen = open ? "simple-popover" : undefined;

	const { id, rating, sale, thumbnail, title, cost, desc, status, category } =
		product;
	return (
		<Card>
			<Box sx={{ pt: "100%", position: "relative" }}>
				<Label
					variant="filled"
					color={(sale && "error") || "info"}
					sx={{
						zIndex: 9,
						top: 16,
						right: 16,
						position: "absolute",
						textTransform: "uppercase",
					}}
				>
					{sale ? "Sale" : "New"}
				</Label>
				<StyledProductImg alt={title} src={thumbnail} />
			</Box>

			<Stack
				spacing={2}
				sx={{ p: 3, cursor: "pointer" }}
				aria-describedby={idOpen}
				variant="contained"
				onClick={handleClick}
			>
				<Link color="inherit" underline="hover">
					<Typography variant="subtitle1" noWrap>
						{title}
					</Typography>
				</Link>

				<Link color="inherit" underline="hover">
					<Typography variant="subtitle2" noWrap>
						{desc}
					</Typography>
				</Link>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Rating name="read-only" value={rating} readOnly size="small" />

					<Typography variant="subtitle1">
						<Typography
							component="span"
							variant="body1"
							sx={{
								color: "text.disabled",
								textDecoration: "line-through",
							}}
						>
							{sale && sale}%
						</Typography>
						&nbsp;
						{fCurrency((cost * (100 - sale)) / 100)}
					</Typography>
				</Stack>
			</Stack>
			<Popover
				id={idOpen}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: "top",
					horizontal: "left ",
				}}
			>
				<Container sx={{ p: 2 }}>
					<Stack
						direction={{ xs: "column", sm: "row" }}
						gap={12}
						alignItems={{ sm: "flex-start", xs: "center" }}
						justifyContent="space-between"
					>
						<Stack rowGap={3} width={{ xs: "100%", sm: "50%" }}>
							<Typography variant="h5">{title}</Typography>
							<Box>
								<img
									className="dvsdsd"
									src={thumbnail}
									width={"320px"}
									height={"320px"}
									alt={title}
									loading="lazy"
								/>
							</Box>
							<Typography variant="subtitle1">{desc}</Typography>
							<Stack
								direction="row"
								alignItems="center"
								width={200}
								justifyContent="space-between"
							>
								<Rating name="read-only" value={rating} readOnly size="small" />

								<Typography variant="subtitle1">
									<Typography
										component="span"
										variant="body1"
										sx={{
											color: "text.disabled",
											textDecoration: "line-through",
										}}
									>
										{sale && sale}%
									</Typography>
									&nbsp;
									{fCurrency((cost * (100 - sale)) / 100)}
								</Typography>
							</Stack>
						</Stack>
						<Stack width={{ xs: "100%", sm: "50%" }}>
							<Typography variant="h5">Analytic</Typography>
							<List>
								<ListItem>
									<Typography variant="subtitle1" paddingRight={1}>
										Category:{" "}
									</Typography>
									{category && category.name}
								</ListItem>
								<ListItem>
									<Typography variant="subtitle1" paddingRight={1}>
										Sale:{" "}
									</Typography>
									{sale}%
								</ListItem>
								<ListItem>
									<Typography variant="subtitle1" paddingRight={1}>
										Cost:{" "}
									</Typography>
									{cost} USD
								</ListItem>
								<ListItem>
									<Typography variant="subtitle1" paddingRight={1}>
										Product Sale:
									</Typography>{" "}
									{100}
								</ListItem>
								<ListItem>
									<Typography variant="subtitle1" paddingRight={1}>
										Total Earn:
									</Typography>{" "}
									{cost * 100} USD
								</ListItem>
							</List>

							<Divider />
							<Typography variant="h5" paddingTop={2}>
								Employer
							</Typography>
							<List>
								<ListItem>
									<StyledBadge
										overlap="circular"
										anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
										variant="dot"
									>
										<Avatar
											alt="Remy Sharp"
											src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/5858d2f45e8acdf342482d160892b3f7~c5_100x100.jpeg?x-expires=1672120800&x-signature=36hVKDbrnS%2FQv80mc09T0XSU%2Bvk%3D  "
										/>
									</StyledBadge>
									<Typography
										variant="subtitle1"
										paddingLeft={1}
										paddingRight={1}
									>
										Chef:{" "}
									</Typography>
									Jamie Oliver
								</ListItem>
							</List>
						</Stack>
					</Stack>
					<Typography variant="h5" paddingTop={5} paddingBottom={2}>
						History Orders
					</Typography>
					<HistoryOrder />

					<Typography variant="h5" paddingTop={5} paddingBottom={2}>
						Edit Product
					</Typography>
					<EditProduct
						id={id}
						sale={sale}
						thumbnail={thumbnail}
						title={title}
						cost={cost}
						desc={desc}
						status={status}
						category={category}
						setProducts={setProducts}
						products={products}
						handleClose={handleClose}
					/>
				</Container>
			</Popover>
		</Card>
	);
}

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
