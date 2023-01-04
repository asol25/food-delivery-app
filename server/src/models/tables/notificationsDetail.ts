import { Schedules } from "./schedules";
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
import { Users } from "./users";

@Entity()
export class NotificationsDetail extends BaseEntity {
	@PrimaryColumn()
	productId!: number;

	@PrimaryColumn()
	userId!: number;

	@PrimaryColumn()
	notificationId!: number;

	@PrimaryColumn()
	schedulesId!: number;

	@ManyToOne(() => Products, (product) => product.notificationsDetail)
	@JoinColumn({ name: "productId" })
	product!: Products;

	@ManyToOne(() => Users, (user) => user.notificationsDetail)
	@JoinColumn({ name: "userId" })
	user!: Users;

	@ManyToOne(() => Notifications, (notification) => notification.notificationsDetail)
	@JoinColumn({ name: "notificationId" })
	notification!: Notifications;

	@ManyToOne(() => Schedules, (schedules) => schedules.notificationsDetail)
	@JoinColumn({ name: "schedulesId" })
	schedules!: Schedules;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
