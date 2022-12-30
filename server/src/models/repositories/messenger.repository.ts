import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { GetMessageDto } from "../dtos/get-messages.dto";
import { Messages } from "../tables/messages";
import { Receiver } from "../tables/message_receiver";
import { Sender } from "../tables/message_sender";
import { MessageDto } from "./../dtos/create-msesage.dto";

@Injectable()
export class MessengerRepository extends Repository<Messages> {
	constructor(private dataSource: DataSource) {
		super(Messages, dataSource.createEntityManager());
	}

	async createMessage(createMessageDto: MessageDto): Promise<Messages> {
		const { sender, receiver, message } = createMessageDto;
		const messages = new Messages();
		messages.message_sender = sender as unknown as Sender;
		messages.message_recipients = receiver as unknown as Receiver;
		messages.message = message;

		try {
			await messages.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}

		return messages;
	}

	async getMessagesBySenderAndReceiver(
		getMessageDto: GetMessageDto
	): Promise<Messages[]> {
		const { senderSelf, receiverSelf, senderOther, receiverOther } =
			getMessageDto;
		const query = this.createQueryBuilder("messages");

		query.leftJoinAndSelect("messages.message_sender", "sender");
		query.leftJoinAndSelect("messages.message_recipients", "receiver");
		query.where("(sender.id = :senderSelf AND receiver.id = :receiverOther)", {
			senderSelf: senderSelf,
			receiverOther: receiverOther,
		});
		query.orWhere(
			"(sender.id = :senderOther AND receiver.id = :receiverSelf)",
			{
				senderOther: senderOther,
				receiverSelf: receiverSelf,
			}
		);
		query.getMany();

		const messages = await query.getMany();

		return messages;
	}
}
