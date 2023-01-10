import CloseIcon from "@mui/icons-material/Close";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import FilterListIcon from "@mui/icons-material/FilterList";
import {
	Box,
	Divider,
	FormControlLabel,
	IconButton,
	Radio,
	RadioGroup,
	Rating,
	Stack,
} from "@mui/material";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import { CategoriesHook } from "../../services/hook/categoriesHook";
import { ICategory } from "../../services/types/products";
import { filterStateProducts } from "./CategoriesContainer";

export const FILTER_RATING_OPTIONS = ["up4Star", "up3Star", "up2Star", "up1Star"];

export const FILTER_PRICE_OPTIONS = [
	{ value: "below", label: "Below $3", price: 3 },
	{ value: "between", label: "Between $5 - $7", price: 7 },
	{ value: "above", label: "Above $7", price: 30 },
];

type Anchor = "top" | "left" | "bottom" | "right";

interface IProductFilterSideBarProps {
	onFilter: React.Dispatch<React.SetStateAction<filterStateProducts>>;
	cleanFilter: () => void;
}
const ProductFilterSideBar: React.FunctionComponent<IProductFilterSideBarProps> = (props) => {
	const anchor: Anchor = "right";
	const [state, setState] = React.useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});
	const { categories } = CategoriesHook();
	const toggleDrawer =
		(anchor: string, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === "keydown" &&
				((event as React.KeyboardEvent).key === "Tab" ||
					(event as React.KeyboardEvent).key === "Shift")
			) {
				return;
			}

			setState({ ...state, [anchor]: open });
		};

	return (
		<>
			<React.Fragment key={anchor}>
				<Button disableRipple color="inherit" onClick={toggleDrawer(anchor, true)}>
					<h3 className="font-bold text-xs px-4">Filters&nbsp;</h3>
					<FilterListIcon />
				</Button>
				<Drawer
					anchor={anchor}
					open={state[anchor]}
					PaperProps={{
						sx: { width: 280, border: "none", overflow: "hidden" },
					}}
					onClose={toggleDrawer(anchor, false)}
				>
					<div className="clearfix">
						<Stack
							direction="row"
							alignItems="center"
							justifyContent="space-between"
							sx={{ px: 1, py: 2 }}
						>
							<p className="font-semibold ml-1">Filters</p>
							<IconButton onClick={toggleDrawer(anchor, false)}>
								<CloseIcon />
							</IconButton>
						</Stack>

						<Divider />

						<Stack spacing={3} sx={{ p: 3 }}>
							<div>
								<h5 className="font-semibold">Categories</h5>
								<RadioGroup>
									{categories.map((item: ICategory) => (
										<FormControlLabel
											key={item.id}
											value={item.id}
											control={<Radio />}
											label={item.name}
											onClick={() =>
												props.onFilter((prevState) => ({
													...prevState,
													categoryID: item.id,
												}))
											}
										/>
									))}
								</RadioGroup>
							</div>
							<div>
								<h5 className="font-semibold">Price</h5>
								<RadioGroup>
									{FILTER_PRICE_OPTIONS.map((item, index) => (
										<FormControlLabel
											key={index}
											sx={{ fontFamily: "Public Sans" }}
											value={item.price}
											control={<Radio />}
											label={item.label}
											onClick={() =>
												props.onFilter((prevState) => ({
													...prevState,
													cost: item.price,
												}))
											}
										/>
									))}
								</RadioGroup>
							</div>
							<div>
								<h5 className="font-semibold">Rating</h5>
								<RadioGroup>
									{FILTER_RATING_OPTIONS.map((item, index) => (
										<FormControlLabel
											key={item}
											value={item}
											control={
												<Radio
													disableRipple
													color="default"
													icon={<Rating readOnly value={1 + index} />}
													checkedIcon={<Rating readOnly value={1 + index} />}
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
											onClick={() =>
												props.onFilter((prevState) => ({
													...prevState,
													rating: index + 1,
												}))
											}
										/>
									))}
								</RadioGroup>
							</div>
						</Stack>

						<Divider />
						<Box sx={{ p: 3 }} onClick={props.cleanFilter}>
							<Button fullWidth size="large" type="submit" color="error" variant="outlined">
								<DoNotDisturbAltIcon sx={{ marginRight: ".5em" }} />
								<span>Clear All</span>
							</Button>
						</Box>
					</div>
				</Drawer>
			</React.Fragment>
		</>
	);
};

export default ProductFilterSideBar;
