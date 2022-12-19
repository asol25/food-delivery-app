import { Products } from "./products";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Users } from "./users";
import { EventRole } from "../enums";

@Entity()
export class Notifications extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: "enum",
		enum: EventRole,
		default: EventRole.NONE,
	})
	status: EventRole;

	@Column()
	message: string;

	@ManyToMany(() => Users)
	@JoinTable()
	users: Users[];

	@ManyToMany(() => Products)
	@JoinTable()
	products: Products[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
