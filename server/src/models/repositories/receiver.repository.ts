import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Receiver } from "../tables/message_receiver";
import { CreateEntityMessenger } from "./../../interfaces/createEntityMessenger";
import { MessagesType } from "./../enums/index";

@Injectable()
export class ReceiverRepository
	extends Repository<Receiver>
	implements CreateEntityMessenger
{
	constructor(private dataSource: DataSource) {
		super(Receiver, dataSource.createEntityManager());
	}

	async createEntity(messagesType: MessagesType): Promise<string> {
		const receiver = new Receiver();
		receiver.type = messagesType;

		try {
			await receiver.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}

		return receiver.id;
	}
}
