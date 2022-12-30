/* eslint-disable no-return-assign */
/* eslint-disable react/prop-types */
import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import * as apisCategories from "../../../_mock/categories";
import * as apisProducts from "../../../_mock/products";

const uploader = Uploader({
	apiKey: `${
		process.env.REACT_APP_UPLOADER_API_UPLOADER_KEY ||
		"public_FW25azqzzY2fME4S33UQQMhgyjTe"
	}`,
});
const uploaderOptions = {
	multi: false,
	styles: {
		colors: {
			primary: "#377dff",
		},
	},
};

const UploadButtonComponent = ({ setFiles }) => (
	<UploadButton
		uploader={uploader}
		options={uploaderOptions}
		onComplete={setFiles}
	>
		{({ onClick }) => (
			<Button onClick={onClick} variant="contained" component="label">
				Upload
			</Button>
		)}
	</UploadButton>
);

const UploadFileComponent = ({ files }) =>
	files.map((file) => {
		const { filePath } = file;
		const fileUrl = uploader.url(filePath, "thumbnail");
		return (
			<p key={fileUrl}>
				<a href={fileUrl} target="_blank" rel="noreferrer">
					{}
				</a>
			</p>
		);
	});

export default function EditProduct(props) {
	const [categoryId, setCategoryId] = React.useState("");
	const {
		id,
		sale,
		title,
		thumbnail,
		cost,
		desc,
		setProducts,
		products,
		category,
		handleClose,
	} = props;
	const [files, setFiles] = React.useState([]);
	const [categories, setCategories] = React.useState([]);
	const [onSale, setOnSale] = React.useState(sale);
	const [onTitle, setOnTitle] = React.useState(title);
	const [onCost, setOnCost] = React.useState(cost);

	const handleChangeCategories = (event) => {
		setCategoryId(event.target.value);
	};

	const handleSave = async () => {
		let srcPicture = thumbnail;
		if (files.length > 0) {
			srcPicture = files[0].fileUrl;
		}

		const sendData = {
			productId: id,
			title: onTitle,
			desc,
			thumbnail: srcPicture,
			cost: onCost,
			sale: onSale,
			category: categoryId || category.id,
		};
		try {
			const save = await apisProducts.updateProducts(sendData);
			const { data, status } = save;
			if (status === 200) {
				setProducts(
					products.map((item) => (item.id === data.id ? (item = data) : item))
				);
				handleClose();
			}
		} catch (error) {
			console.log("🚀 ~ file: EditProduct.js:92 ~ handleSave ~ error", error);
		}
	};

	React.useEffect(() => {
		let isChecked = true;
		if (isChecked) {
			const fetchCategories = async () => {
				const response = await apisCategories.getCategories();
				const { data, status } = response;
				if (status === 200 && data.length > 0) {
					setCategories(data);
				}
			};

			fetchCategories();
		}

		return () => {
			isChecked = false;
		};
	}, []);

	return (
		<>
			<Stack flexDirection={"row"}>
				<List>
					<ListItem>
						<div>
							<TextField
								label="Name"
								id="outlined-size-small"
								defaultValue={title}
								size="small"
								type={"text"}
								onChange={(event) => setOnTitle(event.target.value)}
							/>
						</div>
					</ListItem>
					<ListItem>
						<div>
							<TextField
								label="Price"
								id="outlined-size-small"
								defaultValue={cost}
								size="small"
								type={"number"}
								onChange={(event) => setOnCost(event.target.value)}
							/>
						</div>
					</ListItem>
				</List>

				<List>
					<ListItem>
						<div>
							<FormControl sx={{ minWidth: 220 }} size="small">
								<InputLabel id="demo-select-small">Categories</InputLabel>
								<Select
									labelId="demo-select-small"
									id="demo-select-small"
									value={categoryId}
									label="Categories"
									onChange={(event) => handleChangeCategories(event)}
								>
									{categories.length > 0 &&
										categories.map((category) => (
											<MenuItem key={category.id} value={category.id}>
												{category.name}
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</div>
					</ListItem>
					<ListItem>
						<div>
							<TextField
								label="Discount"
								id="outlined-size-small"
								defaultValue={sale}
								size="small"
								type={"number"}
								onChange={(event) => setOnSale(event.target.value)}
							/>
						</div>
					</ListItem>
				</List>

				<List>
					<ListItem>
						<div>
							{files.length ? (
								<UploadFileComponent files={files} />
							) : (
								<UploadButtonComponent setFiles={setFiles} />
							)}
						</div>
					</ListItem>
					<ListItem>
						<div>
							<Button
								onClick={() => handleSave()}
								variant="contained"
								component="label"
							>
								Save....
							</Button>
						</div>
					</ListItem>
				</List>
			</Stack>
		</>
	);
}
