/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Button } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet-async";
import "../chat.css";
import { isArray } from "lodash";

const Alert = React.forwardRef((props, ref) => (
	<MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const filterClients = (allClients, onlineClients) => {
	const isSameUser = (a, b) => a.email === b.email;
	const filterArray = (left, right, compareFunction) =>
		left.filter((leftValue) => {
			const value = right.some((rightValue) => {
				const source = {
					socket: rightValue.socket,
				};
				Object.assign(leftValue, source);
				return compareFunction(leftValue, rightValue.client);
			});
			if (value === true) {
				return (leftValue.online = true);
			}
			return leftValue;
		});

	let filterClients = filterArray(allClients, onlineClients, isSameUser);
	return (filterClients = filterClients.sort((a, b) => {
		if (a.online) return -1;
		if (b.online) return 1;
		if (a.name < b.name) return -1;
		return a.name > b.name ? 1 : 0;
	}));
};
export default function MessengerPage({ socket }) {
	const { user } = useAuth0();
	const [allClients, setAllClients] = React.useState([]);
	const [listMsg, setListMsg] = React.useState([]);
	const [msg, setMsg] = React.useState("");
	const [receiver, setReceiver] = React.useState("");
	const [sender, setSender] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(true);
	const [selectedClient, setSelectedClient] = React.useState(null);
	/**
	 * Send message with email sender && email receiver
	 * @param {object} sender
	 * @param {object} receiver
	 */
	const handleEventGetMessagesBySenderAndReceiver = ({
		senderSelf,
		senderOther,
		receiverSelf,
		receiverOther,
	}) => {
		socket.emit("get_messages", {
			to: [socket.id],
			senderSelf,
			senderOther,
			receiverSelf,
			receiverOther,
		});
	};

	/**
	 * Send message to client specially by socket ID
	 * @param {object} client
	 */
	const handleEventSendMessageBetweenToAEmployer = (client) => {
		const senderSelf = JSON.parse(localStorage.getItem("verified")).sender.id;
		const receiverOther = client.receiver.id;
		if (msg !== "") {
			socket.emit("send_message_to_a_employer", {
				to: [socket.id, client.socket],
				from: socket.id,
				message: msg,
				sender: senderSelf,
				receiver: receiverOther,
			});
			setMsg("");
		}
	};

	/**
	 * Object container employer selected
	 * @param {object} client
	 */
	const handleSelectClient = (client) => {
		setListMsg([]);
		setSelectedClient(client);
		const senderSelf = JSON.parse(localStorage.getItem("verified")).sender.id;
		const receiverOther = client.receiver.id;
		const senderOther = client.sender.id;
		const receiverSelf = JSON.parse(localStorage.getItem("verified")).receiver
			.id;

		handleEventGetMessagesBySenderAndReceiver({
			senderSelf,
			senderOther,
			receiverSelf,
			receiverOther,
		});
	};

	React.useEffect(() => {
		let isChecked = true;
		if (isChecked) {
			socket.on("connect", () => {
				console.log(`⚡: ${socket.id} user just connected!`);
				socket.on("clients", ({ clients }) => {
					setAllClients(filterClients(allClients, clients));
					setIsLoading(false);
				});

				socket.on("receive_messages", (messageRepositoryObject) => {
					if (isArray(messageRepositoryObject)) {
						setListMsg(messageRepositoryObject);
					}
					setListMsg((preState) => [...preState, messageRepositoryObject]);
				});
			});
		}
		return () => {
			isChecked = false;
			socket.off("connect");
			socket.off("disconnect");
		};
	}, [socket, allClients]);

	/**
	 * The useEffect hook get List Employer in system.
	 */
	React.useEffect(() => {
		let isChecked = true;
		if (isChecked) {
			const fetchAllClients = async () => {
				const clients = await axios.get(
					"http://localhost:33714/employer/pagination/1/30"
				);

				if (clients.status === 200) {
					setAllClients(clients.data.data);
				}
			};
			fetchAllClients();
		}

		return () => {
			isChecked = false;
		};
	}, []);

	return (
		<>
			<Helmet>
				<title> Messenger | Minimal UI </title>
			</Helmet>

			<Container>
				{allClients.length > 0 && isLoading === false ? (
					allClients.map((client) => (
						<>
							<Alert
								severity="success"
								sx={{ width: "100%" }}
								key={client.id}
								onClick={() => handleSelectClient(client)}
							>
								{client.email}
							</Alert>
							<span>{`${client.online}`}</span>
						</>
					))
				) : (
					<Box sx={{ width: "100%" }}>
						<LinearProgress />
					</Box>
				)}

				{listMsg.length > 0 &&
					listMsg.map((msg) => (
						<Alert key={msg.id} severity="info">
							{msg.message}
						</Alert>
					))}

				<div>
					<TextField
						fullWidth
						id="standard-multiline-static"
						label="Message"
						multiline
						rows={2}
						value={msg}
						variant="standard"
						onChange={(e) => setMsg(e.target.value)}
					/>
					<br />
					<br />
					<Button
						onClick={() => {
							handleEventSendMessageBetweenToAEmployer(selectedClient);
						}}
					>
						@Click
					</Button>
				</div>
			</Container>
		</>
	);
}
