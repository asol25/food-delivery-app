import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users";

@Entity()
export class Addresses extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(() => Users, (user) => user.addresses)
	users: Users;

	@Column()
	addresses_one: string;

	@Column({ nullable: true })
	addresses_two!: string;
}
