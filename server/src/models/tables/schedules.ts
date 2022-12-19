import {
	BaseEntity,
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./products";
import { Users } from "./users";

@Entity()
export class Schedules extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToMany(() => Users)
	@JoinTable()
	users: Users[];

	@ManyToMany(() => Products)
	@JoinTable()
	products: Products[];

	@Column({ type: "timestamptz" })
	from: Date;
}