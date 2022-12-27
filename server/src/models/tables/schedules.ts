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

	@Column({ type: "timestamp" })
	from: Date;

	@Column({ type: "timestamp", nullable: true })
	ship!: Date;

	@Column({ type: "timestamp", nullable: true })
	to!: Date;
}
