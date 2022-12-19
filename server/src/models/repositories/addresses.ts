import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users";

@Entity()
export class Addresses {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Users, (user) => user.addresses)
	users: Users;

	@Column()
	addresses_one: string;

	@Column({ nullable: true })
	addresses_two!: string;
}
