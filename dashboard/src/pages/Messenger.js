/* eslint-disable consistent-return */
/* eslint-disable no-return-assign */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import {
	Button,
	Container,
	Grid,
	Stack,
	Typography,
	Alert,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { isArray } from "lodash";
import React from "react";
import { Helmet } from "react-helmet-async";
import "../chat.css";

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0,
		},
	},
}));

const Item = styled(Paper)(({ theme }) => ({
	backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
	...theme.typography.body2,
	padding: theme.spacing(1),
	textAlign: "center",
	color: theme.palette.text.secondary,
}));

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
			leftValue.online = false;
			if (value === true) {
				return (leftValue.online = true);
			}
			return leftValue;
		});

	let filterClients = filterArray(allClients, onlineClients, isSameUser);
	return (filterClients = filterClients.sort((a, b) => {
		if (a.online) return -1;
		if (b.online) return 1;
		if (a.email < b.email) return -1;
		return a.email > b.email ? 1 : 0;
	}));
};
export default function MessengerPage({ socket }) {
	const [allClients, setAllClients] = React.useState([]);
	const [listMsg, setListMsg] = React.useState([]);
	const [msg, setMsg] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(true);
	const [selectedClient, setSelectedClient] = React.useState(null);
	const [senderSelf, setSenderSelf] = React.useState(null);
	const messagesEndRef = React.useRef(null);

	const scrollToBottom = () => {
		messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
	};

	React.useEffect(() => {
		if (isLoading === true && allClients.length > 0) {
			socket.emit("clients", ({ clients }) => {
				setAllClients(filterClients(allClients, clients));
				setIsLoading(false);
			});
		}
	}, [window.location.pathname, allClients]);
	React.useEffect(scrollToBottom, [listMsg]);
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
		setSelectedClient(client);
		setListMsg([]);
		const senderSelf = JSON.parse(localStorage.getItem("verified")).sender.id;
		setSenderSelf(senderSelf);
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

		if (isChecked && allClients.length > 0) {
			socket.on("clients", ({ clients }) => {
				setAllClients(filterClients(allClients, clients));
				setIsLoading(false);
			});
			socket.on("receive_messages", (messageRepositoryObject) => {
				console.log(messageRepositoryObject);
				if (isArray(messageRepositoryObject)) {
					setListMsg(messageRepositoryObject);
				} else {
					setListMsg((preState) => [...preState, messageRepositoryObject]);
				}
			});
		}
		return () => {
			isChecked = false;
			socket.off("receive_messages");
			socket.off("connect");
			socket.off("disconnect");
			socket.off("pong");
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

			<Container position="relative">
				<Grid container spacing={2}>
					<Grid item xs={12} md={4}>
						<Item>
							<Stack gap={2}>
								{allClients.length > 0 && isLoading === false ? (
									allClients.map((client) => {
										if (client.online) {
											return (
												<Box
													key={client.id}
													display="flex"
													flexDirection={"row"}
													alignItems="center"
													justifyContent={"flex-start"}
													columnGap={2}
													onClick={() => handleSelectClient(client)}
												>
													<StyledBadge
														overlap="circular"
														anchorOrigin={{
															vertical: "bottom",
															horizontal: "right",
														}}
														variant="dot"
													>
														<Avatar alt="Remy Sharp" src={client.picture} />
													</StyledBadge>
													<Typography>{client.name}</Typography>
												</Box>
											);
										}

										return (
											<Box
												key={client.id}
												display="flex"
												flexDirection={"row"}
												alignItems="center"
												justifyContent={"flex-start"}
												columnGap={2}
												onClick={() => handleSelectClient(client)}
											>
												<Avatar alt="Remy Sharp" src={client.picture} />
												<Typography>{client.name}</Typography>
											</Box>
										);
									})
								) : (
									<Box sx={{ width: "100%" }}>
										<LinearProgress />
									</Box>
								)}
							</Stack>
						</Item>
					</Grid>
					<Grid item xs={12} md={8}>
						<Item>
							<Box
								height={"500px"}
								display="flex"
								flexDirection="column"
								justifyContent="space-between"
							>
								<Box height={"450px"} maxHeight="450px" className="clearfix">
									{listMsg.length > 0 &&
										listMsg.map((msg, index) => {
											if (String(msg.message_sender.id).includes(senderSelf)) {
												return (
													<Box
														key={index}
														display="flex"
														justifyContent={"flex-end"}
														alignItems="center"
														gap={2}
														marginY={2}
														marginRight={2}
													>
														<Alert icon={false}>{msg.message}</Alert>
														<Avatar
															alt="Remy Sharp"
															src="/static/images/avatar/1.jpg"
															sizes="small"
														/>
													</Box>
												);
											}

											return (
												<Box
													key={index}
													display="flex"
													justifyContent={"flex-start"}
													alignItems="center"
													gap={2}
													marginY={2}
												>
													<Avatar
														alt="Remy Sharp"
														src="/static/images/avatar/1.jpg"
														sizes="small"
													/>
													<Alert icon={false}>{msg.message}</Alert>
												</Box>
											);
										})}
									<div ref={messagesEndRef} />
								</Box>

								<div>
									{selectedClient && (
										<>
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
													handleEventSendMessageBetweenToAEmployer(
														selectedClient
													);
												}}
											>
												@Click
											</Button>
										</>
									)}
								</div>
							</Box>
						</Item>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
