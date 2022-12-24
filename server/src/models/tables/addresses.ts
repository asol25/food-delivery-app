import {
	BaseEntity,
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users";

@Entity()
export class Addresses extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	userId!: number;

	@OneToMany(() => Users, (user) => user.addresses)
	@JoinColumn({ name: "userId" })
	users: Users;

	@Column()
	addresses_one: string;

	@Column({ nullable: true })
	addresses_two!: string;
}
