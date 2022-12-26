/* eslint-disable react/prop-types */
import { Box, Button, List, ListItem, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import * as React from "react";
// components
// mock
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
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
					Successful
				</a>
			</p>
		);
	});

export default function CreateProducts(props) {
	const { onChangeProducts, setAnchorEl } = props;
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [categoryId, setCategoryId] = React.useState("");
	const [categories, setCategories] = React.useState([]);
	const [files, setFiles] = React.useState([]);

	const handleChangeCategories = (event) => {
		setCategoryId(event.target.value);
	};

	const onSubmit = (data) => {
		if (files.length > 0) {
			const sendData = {
				title: data.TitleRequired,
				cost: data.CostRequired,
				sale: data.SaleRequired,
				thumbnail: files[0].fileUrl,
				desc: data.DescRequired,
				category: categoryId,
			};

			handleSaving(sendData);
		}
	};

	const handleSaving = async (sendData) => {
		const response = await apisProducts.createProducts(sendData);
		const { data } = response;
		await onChangeProducts((oldArray) => [...oldArray, data]);
		return setAnchorEl(null);
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
			<form onSubmit={handleSubmit(onSubmit)}>
				<Box sx={{ p: 2 }}>
					<List>
						<ListItem>
							<div>
								<TextField
									label="Title"
									id="outlined-size-small"
									size="small"
									{...register("TitleRequired", { required: true })}
								/>
								<Typography mt={1}>
									{errors.TitleRequired && <span>This Title is required</span>}
								</Typography>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<TextField
									label="Desc"
									id="outlined-size-small"
									size="small"
									{...register("DescRequired", { required: true })}
								/>
								<Typography mt={1}>
									{errors.DescRequired && <span>This Desc is required</span>}
								</Typography>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<TextField
									label="Cost"
									id="outlined-size-small"
									size="small"
									type={"number"}
									{...register("CostRequired", {
										required: true,
									})}
								/>
								<Typography mt={1}>
									{errors.CostRequired && <span>This Cost is required</span>}
								</Typography>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<TextField
									label="Sale"
									id="outlined-size-small"
									size="small"
									type={"number"}
									{...register("SaleRequired", {
										required: true,
									})}
								/>
								<Typography mt={1}>
									{errors.SaleRequired && <span>This Sale is required</span>}
								</Typography>
							</div>
						</ListItem>
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
							<Stack
								flexDirection={"row"}
								gap={2}
								justifyContent={"space-between"}
							>
								{files.length ? (
									<UploadFileComponent files={files} />
								) : (
									<UploadButtonComponent setFiles={setFiles} />
								)}
								<Button type="submit">Save</Button>
							</Stack>
						</ListItem>
					</List>
				</Box>
			</form>
		</>
	);
}

CreateProducts.prototype = {
	onChangeProducts: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	anchorEl: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};
