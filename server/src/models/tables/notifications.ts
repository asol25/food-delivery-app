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
import { NotificationToProductsAndUsers } from "./notificationToProductsAndUsers";
import { SchedulesToProductsAndUsers } from "./schedulesToProductsAndUsers";

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

	@OneToMany(
		() => NotificationToProductsAndUsers,
		(notificationToProductsAndUsers) =>
			notificationToProductsAndUsers.notification
	)
	notificationToProductsAndUsers!: NotificationToProductsAndUsers[];

	@OneToMany(
		() => SchedulesToProductsAndUsers,
		(schedulesToProductsAndUser) => schedulesToProductsAndUser.notification
	)
	schedulesToProductsAndUsers!: SchedulesToProductsAndUsers[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
