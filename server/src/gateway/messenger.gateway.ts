import { MessageDto } from "./../models/dtos/create-msesage.dto";
import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";
import { MessengerRepository } from "./../models/repositories/messenger.repository";
import { GetMessageDto } from "../models/dtos/get-messages.dto";

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class MessengerGateway
	implements OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer()
	server: Server;
	allClients = [];
	constructor(private messengerRepository: MessengerRepository) {}

	handleConnection(client: any) {
		try {
			console.log("Con", client.id);
			const username = client.handshake.auth.username || null;
			this.allClients.push({
				socket: client.id,
				client: username,
			});

			this.server.sockets.emit("clients", {
				clients: this.allClients,
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	handleDisconnect(client: any) {
		try {
			console.log("Dis", client.id);
			this.allClients = this.allClients.filter(
				(clientOnline) =>
					String(clientOnline.socket).includes(String(client.id)) === false
			);

			this.server.sockets.emit("clients", {
				clients: this.allClients,
			});
		} catch (error) {
			console.error(error);
			throw error;
		}
	}

	@SubscribeMessage("clients")
	async handleEventGetClients() {
		return { clients: this.allClients };
	}

	@SubscribeMessage("get_messages")
	async handleEventGetMessagesBySenderAndReceiver(
		@MessageBody() getMessageDto: GetMessageDto
	) {
		const messageRepositoryObject =
			await this.messengerRepository.getMessagesBySenderAndReceiver(
				getMessageDto
			);
		if (messageRepositoryObject.length > 0) {
			this.server.sockets
				.to(getMessageDto.to)
				.emit("receive_messages", messageRepositoryObject);
		}
	}

	@SubscribeMessage("send_message_to_a_employer")
	async handleEventBetweenToAEmployer(@MessageBody() messageDto: MessageDto) {
		const messageRepositoryArray = await this.messengerRepository.createMessage(
			messageDto
		);
		if (this.messengerRepository.hasId(messageRepositoryArray)) {
			this.server.sockets
				.to(messageDto.to)
				.emit("receive_messages", messageRepositoryArray);
		}
	}
}
