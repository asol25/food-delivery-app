import { IsEmail } from "class-validator";
import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Receiver } from "./message_recipients";
import { Sender } from "./message_sender";

@Entity()
export class Employees extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	@IsEmail()
	email: string;

	@OneToOne(() => Receiver)
	@JoinColumn()
	receiver: Receiver;

	@OneToOne(() => Sender)
	@JoinColumn()
	sender: Sender;
}
