import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// @mui
import { Button, Container, Stack, Typography } from "@mui/material";
import Popover from "@mui/material/Popover";

// components
// mock

import Iconify from "../components/iconify";
import {
	ProductCartWidget,
	ProductFilterSidebar,
	ProductList,
	ProductSort,
} from "../sections/@dashboard/products";
import CreateProducts from "../sections/@dashboard/products/CreateProduct";
import * as apisProducts from "../_mock/products";
// ----------------------------------------------------------------------

export default function ProductsPage() {
	const [openFilter, setOpenFilter] = useState(false);
	const [products, setProducts] = useState([]);
	const [filterCategory, setFilterCategory] = useState("");
	const [filterPrice, setFilterPrice] = useState({ value: "", price: "" });
	const [sortProducts, setSortProducts] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? "simple-popover" : undefined;

	const handleOpenFilter = () => {
		setOpenFilter(true);
	};

	const cleanFilter = () => {
		setFilterCategory("");
		setFilterPrice("");
		setOpenFilter(false);
	};

	const handleCloseFilter = () => {
		setOpenFilter(false);
	};

	const handleFilterCategory = (key) => {
		setFilterCategory(key);
	};

	const handleFilterPrice = (key) => {
		setFilterPrice(key);
	};

	const applyFiller = (options) => {
		const { products, filterCategory, filterPrice, sortProducts } = options;
		let productsFilter = products;

		if (filterCategory) {
			productsFilter = productsFilter.filter(
				(product) => product.categoryId === filterCategory
			);
		}

		if (filterPrice.price) {
			productsFilter = productsFilter.filter(
				(product) => product.cost <= filterPrice.price
			);
		}

		if (sortProducts) {
			productsFilter = productsFilter.sort((a, b) => a.cost - b.cost);
			productsFilter = productsFilter.reverse();
		} else {
			productsFilter = productsFilter.sort((a, b) => a.cost - b.cost);
		}
		return productsFilter;
	};

	useEffect(() => {
		let isChecked = true;
		if (isChecked) {
			const fetchDataUsers = async () => {
				const response = await apisProducts.getProductsWithPagination(1, 30);
				const { data, status } = response;
				if (status === 200 && data.data.length > 0) {
					setProducts(data.data);
				}
			};
			fetchDataUsers();
		}

		return () => {
			isChecked = false;
		};
	}, []);

	const filterProducts = products
		? applyFiller({ products, filterCategory, filterPrice, sortProducts })
		: [];

	return (
		<>
			<Helmet>
				<title> Dashboard: Products | Minimal UI </title>
			</Helmet>

			<Container>
				<Stack
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					mb={5}
				>
					<Typography variant="h4" gutterBottom>
						Products
					</Typography>
					<Button
						onClick={handleClick}
						variant="contained"
						startIcon={<Iconify icon="eva:plus-fill" />}
					>
						New Products
					</Button>
				</Stack>

				<Stack
					direction="row"
					flexWrap="wrap-reverse"
					alignItems="center"
					justifyContent="flex-end"
					sx={{ mb: 5 }}
				>
					<Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
						<ProductFilterSidebar
							openFilter={openFilter}
							onOpenFilter={handleOpenFilter}
							onCloseFilter={handleCloseFilter}
							onFilterCategory={handleFilterCategory}
							onFilterPrice={handleFilterPrice}
							cleanFilter={cleanFilter}
							stateFilterCategory={filterCategory}
							stateFilterPrice={filterPrice}
						/>
						<ProductSort onFilterSort={setSortProducts} />
					</Stack>
				</Stack>

				{filterProducts && (
					<ProductList
						products={products}
						filterProducts={filterProducts}
						setProducts={setProducts}
					/>
				)}
				<ProductCartWidget />
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: "top",
						horizontal: "left",
					}}
				>
					<CreateProducts
						setAnchorEl={setAnchorEl}
						onChangeProducts={setProducts}
					/>
				</Popover>
			</Container>
		</>
	);
}
