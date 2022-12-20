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
import { Users } from "./users";

@Entity()
export class NotificationToProductsAndUsers extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => Products,
		(product) => product.notificationToProductsAndUsers
	)
	products!: Products;

	@ManyToOne(() => Users, (user) => user.notificationToProductsAndUsers)
	user!: Users;

	@ManyToOne(
		() => Notifications,
		(notification) => notification.notificationToProductsAndUsers
	)
	notification!: Notifications;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
