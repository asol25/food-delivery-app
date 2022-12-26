import PropTypes from "prop-types";
import * as React from "react";
// @mui
import {
	Box,
	Button,
	Divider,
	Drawer,
	FormControlLabel,
	IconButton,
	Radio,
	RadioGroup,
	Rating,
	Stack,
	Typography,
} from "@mui/material";
// components
import Iconify from "../../../components/iconify";
import Scrollbar from "../../../components/scrollbar";
import * as apisCategories from "../../../_mock/categories";

// ----------------------------------------------------------------------

export const SORT_BY_OPTIONS = [
	{ value: "featured", label: "Featured" },
	{ value: "newest", label: "Newest" },
	{ value: "priceDesc", label: "Price: High-Low" },
	{ value: "priceAsc", label: "Price: Low-High" },
];
export const FILTER_RATING_OPTIONS = [
	"up4Star",
	"up3Star",
	"up2Star",
	"up1Star",
];
export const FILTER_PRICE_OPTIONS = [
	{ value: "below", label: "Below $3", price: 3 },
	{ value: "between", label: "Between $5 - $7", price: 7 },
	{ value: "above", label: "Above $7", price: 30 },
];
export const FILTER_COLOR_OPTIONS = [
	"#00AB55",
	"#000000",
	"#FFFFFF",
	"#FFC0CB",
	"#FF4842",
	"#1890FF",
	"#94D82D",
	"#FFC107",
];

// ----------------------------------------------------------------------

ShopFilterSidebar.propTypes = {
	openFilter: PropTypes.bool,
	onOpenFilter: PropTypes.func.isRequired,
	onCloseFilter: PropTypes.func.isRequired,
	onFilterCategory: PropTypes.func.isRequired,
	onFilterPrice: PropTypes.func.isRequired,
	cleanFilter: PropTypes.func.isRequired,
	stateFilterCategory: PropTypes.string.isRequired,
	stateFilterPrice: PropTypes.object.isRequired,
};

export default function ShopFilterSidebar({
	openFilter,
	onOpenFilter,
	onCloseFilter,
	onFilterCategory,
	onFilterPrice,
	cleanFilter,
	stateFilterCategory,
	stateFilterPrice,
}) {
	const [filterCategories, setFilterCategories] = React.useState([]);

	React.useEffect(() => {
		let isChecked = true;
		if (isChecked) {
			const fetchCategories = async () => {
				const response = await apisCategories.getCategories();
				const { data, status } = response;
				if (status === 200 && data.length > 0) {
					setFilterCategories(data);
				}
			};

			fetchCategories();
		}

		return () => {
			isChecked = false;
		};
	}, [filterCategories]);

	return (
		<>
			<Button
				disableRipple
				color="inherit"
				endIcon={<Iconify icon="ic:round-filter-list" />}
				onClick={onOpenFilter}
			>
				Filters&nbsp;
			</Button>

			<Drawer
				anchor="right"
				open={openFilter}
				onClose={onCloseFilter}
				PaperProps={{
					sx: { width: 280, border: "none", overflow: "hidden" },
				}}
			>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					sx={{ px: 1, py: 2 }}
				>
					<Typography variant="subtitle1" sx={{ ml: 1 }}>
						Filters
					</Typography>
					<IconButton onClick={onCloseFilter}>
						<Iconify icon="eva:close-fill" />
					</IconButton>
				</Stack>

				<Divider />

				<Scrollbar>
					<Stack spacing={3} sx={{ p: 3 }}>
						<div>
							<Typography variant="subtitle1" gutterBottom>
								Categories
							</Typography>
							<RadioGroup>
								{filterCategories.map((item) => {
									if (item.id === stateFilterCategory) {
										return (
											<FormControlLabel
												key={item.id}
												value={item.id}
												control={<Radio checked />}
												label={item.name}
												onClick={() => onFilterCategory(item.id)}
											/>
										);
									}
									return (
										<FormControlLabel
											key={item.id}
											value={item.id}
											control={<Radio />}
											label={item.name}
											onClick={() => onFilterCategory(item.id)}
										/>
									);
								})}
							</RadioGroup>
						</div>

						<div>
							<Typography variant="subtitle1" gutterBottom>
								Price
							</Typography>
							<RadioGroup>
								{FILTER_PRICE_OPTIONS.map((item) => {
									if (item.value === stateFilterPrice.value) {
										return (
											<FormControlLabel
												key={item.value}
												value={item.value}
												control={<Radio checked />}
												label={item.label}
												onClick={() => {
													onFilterPrice({
														value: item.value,
														price: item.price,
													});
												}}
											/>
										);
									}
									return (
										<FormControlLabel
											key={item.value}
											value={item.value}
											control={<Radio />}
											label={item.label}
											onClick={() => {
												onFilterPrice({ value: item.value, price: item.price });
											}}
										/>
									);
								})}
							</RadioGroup>
						</div>

						<div>
							<Typography variant="subtitle1" gutterBottom>
								Rating
							</Typography>
							<RadioGroup>
								{FILTER_RATING_OPTIONS.map((item, index) => (
									<FormControlLabel
										key={item}
										value={item}
										control={
											<Radio
												disableRipple
												color="default"
												icon={<Rating readOnly value={4 - index} />}
												checkedIcon={<Rating readOnly value={4 - index} />}
												sx={{
													"&:hover": { bgcolor: "transparent" },
												}}
											/>
										}
										label="& Up"
										sx={{
											my: 0.5,
											borderRadius: 1,
											"&:hover": { opacity: 0.48 },
										}}
									/>
								))}
							</RadioGroup>
						</div>
					</Stack>
				</Scrollbar>

				<Box sx={{ p: 3 }} onClick={cleanFilter}>
					<Button
						fullWidth
						size="large"
						type="submit"
						color="inherit"
						variant="outlined"
						startIcon={<Iconify icon="ic:round-clear-all" />}
					>
						Clear All
					</Button>
				</Box>
			</Drawer>
		</>
	);
}
