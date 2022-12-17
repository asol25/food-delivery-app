import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Stack } from "@mui/system";

export default function CategoriesMenuMobile() {
	const [categories, setCategories] = React.useState("");
	const handleChange = (event: SelectChangeEvent) => {
		setCategories(event.target.value);
	};

	return (
		<>
			<Stack flexDirection={"row"} justifyContent={"space-around"}>
				<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
					<InputLabel id="demo-select-small">Categories</InputLabel>
					<Select
						labelId="demo-select-small"
						id="demo-select-small"
						value={categories}
						label="Categories"
						onChange={handleChange}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
				<FormControl sx={{ m: 1, minWidth: 120 }} size="small">
					<InputLabel id="demo-select-small">Options</InputLabel>
					<Select
						labelId="demo-select-small"
						id="demo-select-small"
						value={categories}
						label="Options"
						onChange={handleChange}
					>
						<MenuItem value="">
							<em>None</em>
						</MenuItem>
						<MenuItem value={10}>Ten</MenuItem>
						<MenuItem value={20}>Twenty</MenuItem>
						<MenuItem value={30}>Thirty</MenuItem>
					</Select>
				</FormControl>
			</Stack>
		</>
	);
}
