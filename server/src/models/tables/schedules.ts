import {
	BaseEntity,
	Column,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { SchedulesDetail } from "./schedulesDetail";

@Entity()
export class Schedules extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@OneToMany(
		() => SchedulesDetail,
		(scheduleDetails) => scheduleDetails.schedule
	)
	scheduleDetails: SchedulesDetail[];

	@Column({ type: "timestamptz" })
	from: Date;

	@Column({ type: "timestamptz", nullable: true })
	ship!: Date;

	@Column({ type: "timestamptz", nullable: true })
	to!: Date;
}
