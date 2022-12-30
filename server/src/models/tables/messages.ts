import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Receiver } from "./message_receiver";
import { Sender } from "./message_sender";

@Entity()
export class Messages extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Column()
	message: string;

	@ManyToOne(() => Sender, (snd) => snd.messagesOut)
	message_sender: Sender;

	@ManyToOne(() => Receiver, (rcv) => rcv.messagesIn)
	message_recipients: Receiver;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
