import { MessengerGateway } from "./../gateway/messenger.gateway";
import { Module } from "@nestjs/common";
import { MessengerRepository } from "./../models/repositories/messenger.repository";
@Module({
	providers: [MessengerGateway, MessengerRepository],
})
export class MessengerModule {}
