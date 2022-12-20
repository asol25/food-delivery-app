import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { SchedulesToProductsAndUsers } from "./schedulesToProductsAndUsers";

@Entity()
export class Schedules extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(
		() => SchedulesToProductsAndUsers,
		(schedulesToProductsAndUser) => schedulesToProductsAndUser.schedule
	)
	schedulesToProductsAndUsers!: SchedulesToProductsAndUsers[];

	@Column({ type: "timestamptz" })
	from: Date;

	@Column({ type: "timestamptz", nullable: true })
	ship!: Date;

	@Column({ type: "timestamptz", nullable: true })
	to!: Date;
}
