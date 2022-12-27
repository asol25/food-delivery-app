import { MessagesType } from "./../models/enums/index";
export interface CreateEntityMessenger {
	createEntity(messagesType: MessagesType): Promise<string>;
}
