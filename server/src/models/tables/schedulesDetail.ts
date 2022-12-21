import {
	BaseEntity,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";
import { Notifications } from "./notifications";
import { Products } from "./products";
import { Schedules } from "./schedules";
import { Users } from "./users";

@Entity()
export class SchedulesDetail extends BaseEntity {
	@PrimaryColumn()
	productId: number;

	@PrimaryColumn()
	userId: number;

	@PrimaryColumn()
	notificationId: number;

	@ManyToOne(() => Products, (product) => product.schedulesDetail)
	@JoinColumn({ name: "productId" })
	product!: Products;

	@ManyToOne(() => Users, (user) => user.schedulesDetail)
	@JoinColumn({ name: "userId" })
	user!: Users;

	@ManyToOne(
		() => Notifications,
		(notification) => notification.schedulesDetail
	)
	@JoinColumn({ name: "notificationId" })
	notification!: Notifications;

	@PrimaryColumn()
	scheduleId: number;

	@ManyToOne(() => Schedules, (schedule) => schedule.scheduleDetails)
	@JoinColumn({ name: "scheduleId" })
	schedule!: Schedules;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
