/* eslint-disable jsx-a11y/alt-text */
import { Stack, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import InputLabel from "@mui/material/InputLabel";
import PropTypes from "prop-types";
import * as React from "react";
import { useForm } from "react-hook-form";
import { UploadButton } from "react-uploader";
import { Uploader } from "uploader";
import * as apisUser from "../../../_mock/user";

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

UploadButtonComponent.propTypes = {
	setFiles: PropTypes.func.isRequired,
};

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

CreateUser.propTypes = {
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired,
	onChangeUser: PropTypes.func.isRequired,
};

export default function CreateUser({ open, setOpen, onChangeUser }) {
	const [files, setFiles] = React.useState([]);
	const [thumbnail, setThumbnail] = React.useState("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = async (formData) => {
		const address = await apisUser.createAddress({
			addresses_one: formData.address_one,
			addresses_two: formData.address_two,
		});

		const { status } = address;

		if (status === 201) {
			const user = await apisUser.createEmployer({
				name: formData.user,
				email: formData.email,
				phone: formData.phone,
				picture: formData.picture,
				addressesId: address.data.id,
			});

			const { data, status } = await user;

			if (status === 201) {
				await onChangeUser((oldArray) => [...oldArray, data]);
				handleClose();
			}
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	React.useEffect(() => {
		let isChecked = true;
		if (isChecked && files.length > 0) {
			setThumbnail(files[0].fileUrl);
		}
		return () => {
			isChecked = false;
		};
	}, [files]);
	return (
		<>
			<Dialog fullWidth maxWidth={"sm"} open={open} onClose={handleClose}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<DialogContent>
						<Box margin={".9em 1em"}>
							<InputLabel>User Name (required)</InputLabel>
							<TextField
								fullWidth
								size="small"
								required
								{...register("user")}
							/>
							{errors.user && <span>This field is required</span>}
						</Box>
						<Box margin={".9em 1em"}>
							<InputLabel>Email (required)</InputLabel>
							<TextField
								fullWidth
								size="small"
								type={"email"}
								required
								{...register("email", {
									pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
								})}
							/>
							{errors.email && <span>This field is required</span>}
						</Box>
						<Box margin={".9em 1em"}>
							<InputLabel>Phone (required)</InputLabel>
							<TextField
								fullWidth
								size="small"
								type={"number"}
								required
								{...register("phone", {
									pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
								})}
							/>
							{errors.phone && <span>This field is required</span>}
						</Box>

						<Box margin={".9em 1em"}>
							<InputLabel>Address One (required)</InputLabel>
							<TextField
								fullWidth
								size="small"
								type={"text"}
								required
								{...register("address_one")}
							/>
							{errors.Address && <span>This field is required</span>}
						</Box>

						<Box margin={".9em 1em"}>
							<InputLabel>Address Two (* option)</InputLabel>
							<TextField
								fullWidth
								size="small"
								type={"text"}
								{...register("address_two")}
							/>
						</Box>

						<Box margin={".9em 1em"}>
							<InputLabel>Picture Avatar (required)</InputLabel>
							<TextField
								fullWidth
								size="small"
								type={"text"}
								defaultValue={"1"}
								sx={{ opacity: 0 }}
								{...register("picture", { required: true })}
							/>

							{files.length > 0 ? (
								<>
									<img
										src={files[0].fileUrl}
										className="dvsdsd"
										width={"100%"}
										height={"300px"}
									/>
								</>
							) : (
								<>
									<Stack>
										<UploadButtonComponent setFiles={setFiles} />
										{errors.picture && <span>This field is required</span>}
									</Stack>
								</>
							)}
						</Box>
					</DialogContent>

					<DialogActions>
						<Button type="submit">Save</Button>
						<Button onClick={handleClose}>Close</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	);
}
