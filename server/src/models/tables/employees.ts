import { IsBoolean, IsEmail } from "class-validator";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Receiver } from "./message_receiver";
import { Sender } from "./message_sender";

@Entity()
export class Employees extends BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: number;

	@Column()
	name: string;

	@Column()
	@IsEmail()
	email: string;

	@Column({ default: "employer" })
	role: string;

	@Column()
	phone: string;

	@Column({ nullable: true })
	picture!: string;

	@Column({ default: true })
	status: boolean;

	@Column({ default: false })
	@IsBoolean()
	online: boolean;

	@OneToOne(() => Receiver)
	@JoinColumn()
	receiver: Receiver;

	@OneToOne(() => Sender)
	@JoinColumn()
	sender: Sender;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
