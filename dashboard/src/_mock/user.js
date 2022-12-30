import { faker } from "@faker-js/faker";
import axios from "axios";
import { sample } from "lodash";

// ----------------------------------------------------------------------

export const getUsersWithPagination = (page, limit) => {
	const users = axios.get(
		`${
			process.env.REACT_APP_SERVER_URL || "http://localhost:33714"
		}/users/pagination/${page}/${limit}`
	);

	return users;
};

export const getEmployerWithPagination = (page, limit) => {
	const users = axios.get(
		`${
			process.env.REACT_APP_SERVER_URL || "http://localhost:33714"
		}/employer/pagination/${page}/${limit}`
	);

	return users;
};

export const bannedUserByUserId = (userId, status) => {
	const data = {
		userId,
		status,
	};
	const users = axios.put(
		`${
			process.env.REACT_APP_SERVER_URL || "http://localhost:33714"
		}/users/banned`,
		data
	);
	return users;
};

export const bannedEmployerByEmployerId = (userId, status) => {
	const data = {
		userId,
		status,
	};
	const users = axios.put(
		`${
			process.env.REACT_APP_SERVER_URL || "http://localhost:33714"
		}/employer/banned`,
		data
	);
	return users;
};

export const createAddress = async (data) => {
	const address = await axios.post(
		`${
			process.env.REACT_APP_SERVER_URL || "http://localhost:33714"
		}/addresses/create/addresses`,
		data
	);

	return address;
};

export const createUser = async (data) => {
	console.log("🚀 ~ file: user.js:43 ~ createUser ~ data", data);
	const user = await axios.post(
		`${
			process.env.REACT_APP_SERVER_URL || "http://localhost:33714"
		}/users/create/user`,
		data
	);

	return user;
};

export const createEmployer = async (data) => {
	const user = await axios.post(
		`${
			process.env.REACT_APP_SERVER_URL || "http://localhost:33714"
		}/employer/create/employer`,
		data
	);

	return user;
};
const users = [...Array(24)].map((_, index) => ({
	id: faker.datatype.uuid(),
	avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
	name: faker.name.fullName(),
	company: faker.company.name(),
	isVerified: faker.datatype.boolean(),
	status: sample([true, false]),
	role: sample([
		"Leader",
		"Hr Manager",
		"UI Designer",
		"UX Designer",
		"UI/UX Designer",
		"Project Manager",
		"Backend Developer",
		"Full Stack Designer",
		"Front End Developer",
		"Full Stack Developer",
	]),
}));

export default users;
