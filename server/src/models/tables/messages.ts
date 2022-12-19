import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Users } from "./users";

@Entity()
export class Messages extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	message: string;

	@ManyToOne(() => Users, (snd) => snd.sender)
	message_sender: Users;

	@ManyToOne(() => Users, (rcv) => rcv.receiver)
	message_recipients: Users;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
