import { IsEmail, IsInt, Max, Min } from "class-validator";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Addresses } from "./addresses";
import { Comments } from "./comments";
import { Receiver } from "./message_recipients";
import { Sender } from "./message_sender";
import { Orders } from "./orders";

@Entity()
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	@IsEmail()
	email: string;

	@Column()
	@IsInt()
	@Min(8)
	@Max(11)
	phone: number;

	@ManyToOne(() => Addresses, (addresses) => addresses.users)
	addresses: Addresses;

	@OneToMany(() => Comments, (comment) => comment.users)
	comments: Comments[];

	@OneToMany(() => Orders, (order) => order.user)
	orders: Orders[];

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
