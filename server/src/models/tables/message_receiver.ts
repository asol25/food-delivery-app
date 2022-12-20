import { Messages } from "./messages";
import {
	Entity,
	PrimaryGeneratedColumn,
	OneToMany,
	Column,
	BaseEntity,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
import { MessagesType } from "../enums";

@Entity()
export class Receiver extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@OneToMany(() => Messages, (msg) => msg.message_recipients)
	messagesIn: Messages[];

	@Column({
		type: "enum",
		enum: MessagesType,
	})
	type: MessagesType;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
