import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Sender } from "../tables/message_sender";
import { CreateEntityMessenger } from "./../../interfaces/createEntityMessenger";
import { MessagesType } from "./../enums/index";

@Injectable()
export class SenderRepository
	extends Repository<Sender>
	implements CreateEntityMessenger
{
	constructor(private dataSource: DataSource) {
		super(Sender, dataSource.createEntityManager());
	}

	async createEntity(messagesType: MessagesType): Promise<string> {
		const sender = new Sender();
		sender.type = messagesType;

		try {
			await sender.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}

		return sender.id;
	}
}
