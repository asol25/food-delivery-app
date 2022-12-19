import { IsEmail, IsInt, Max, Min, min } from "class-validator";
import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Addresses } from "./Addresses";
import { Comments } from "./comments";
import { Messages } from "./messages";
import { Orders } from "./orders";

@Entity()
export class Users {
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

	@OneToMany(() => Addresses, (addresses) => addresses.users)
	addresses: Addresses[];

	@OneToMany(() => Comments, (comment) => comment.users)
	comments: Comments[];

	@OneToMany(() => Orders, (order) => order.user)
	orders: Orders[];

	@OneToMany(() => Messages, (message) => message.user)
	messages: Messages[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
