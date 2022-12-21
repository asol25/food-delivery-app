import {
	BaseEntity,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	PrimaryGeneratedColumn,
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

	@ManyToOne(() => Products, (product) => product.notificationsDetail)
	@JoinColumn({ name: "productId" })
	product!: Products;

	@ManyToOne(() => Users, (user) => user.notificationsDetail)
	@JoinColumn({ name: "userId" })
	user!: Users;

	@ManyToOne(
		() => Notifications,
		(notification) => notification.notificationsDetail
	)
	@JoinColumn({ name: "notificationId" })
	notification!: Notifications;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
