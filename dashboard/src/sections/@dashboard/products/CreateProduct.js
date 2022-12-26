import * as React from "react";
import { Box, Button, List, ListItem, Stack } from "@mui/material";
import PropTypes from "prop-types";
// components
import Popover from "@mui/material/Popover";
// mock
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
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
					{fileUrl}
				</a>
			</p>
		);
	});

CreateProducts.prototype = {
	onChangeProducts: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	anchorEl: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired,
};

export default function CreateProducts({
	onChangeProducts,
	id,
	open,
	anchorEl,
	handleClose,
}) {
	const [categoryId, setCategoryId] = React.useState("");
	const [categories, setCategories] = React.useState([]);
	const [files, setFiles] = React.useState([]);
	const handleChangeCategories = (event) => {
		setCategoryId(event.target.value);
	};
	const [title, setTitle] = React.useState("");
	const [cost, setCost] = React.useState(0);
	const [sale, setSale] = React.useState(0);
	const [thumbnail, setThumbnail] = React.useState("");
	const [desc, setDesc] = React.useState("");

	const handlSaving = async () => {
		const sendData = {
			title,
			cost,
			sale,
			thumbnail,
			desc,
			category: categoryId,
		};
		const response = await apisProducts.createProducts(sendData);
		const { data, status } = response;
		if (status === 200) {
			onChangeProducts((oldArray) => [data, ...oldArray]);
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
				<Box sx={{ p: 2 }}>
					<List>
						<ListItem>
							<div>
								<TextField
									label="Title"
									id="outlined-size-small"
									defaultValue="Small"
									size="small"
									onChange={(event) => setTitle(event.target.value)}
								/>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<TextField
									label="Desc"
									id="outlined-size-small"
									defaultValue="Small"
									size="small"
									onChange={(event) => setDesc(event.target.value)}
								/>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<TextField
									label="Cost"
									id="outlined-size-small"
									defaultValue="Small"
									size="small"
									onChange={(event) => setCost(event.target.value)}
								/>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<TextField
									label="Sale"
									id="outlined-size-small"
									defaultValue="Small"
									size="small"
									onChange={(event) => setSale(event.target.value)}
								/>
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
							<Stack flexDirection={"row"} gap={2}>
								{files.length ? (
									<UploadFileComponent files={files} />
								) : (
									<UploadButtonComponent setFiles={setFiles} />
								)}
								<Button onClick={handlSaving}>Save</Button>
							</Stack>
						</ListItem>
					</List>
				</Box>
			</Popover>
		</>
	);
}
