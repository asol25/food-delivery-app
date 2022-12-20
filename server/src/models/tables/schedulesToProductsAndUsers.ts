import {
	BaseEntity,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Notifications } from "./notifications";
import { Products } from "./products";
import { Schedules } from "./schedules";
import { Users } from "./users";

@Entity()
export class SchedulesToProductsAndUsers extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Products, (product) => product.schedulesToProductsAndUsers)
	products!: Products;

	@ManyToOne(() => Users, (user) => user.schedulesToProductsAndUsers)
	user!: Users;

	@ManyToOne(
		() => Notifications,
		(notification) => notification.schedulesToProductsAndUsers
	)
	notification!: Notifications;

	@ManyToOne(
		() => Schedules,
		(schedule) => schedule.schedulesToProductsAndUsers
	)
	schedule!: Schedules;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
