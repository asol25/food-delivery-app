import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { EventRole } from "../enums";
import { NotificationsDetail } from "./notificationsDetail";

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

	@OneToMany(() => NotificationsDetail, (notificationsDetail) => notificationsDetail.notification)
	notificationsDetail!: NotificationsDetail[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
