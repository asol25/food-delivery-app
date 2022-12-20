import { IsInt } from "class-validator";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { OrdersDetail } from "./orders_detail";
import { Products } from "./products";
import { Users } from "./users";

@Entity()
export class Orders extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsInt()
	cost: number;

	@Column({ default: false })
	isCheckedPayment: boolean;

	@Column({ default: false })
	isCheckedShipping: boolean;

	@ManyToOne(() => Users, (user) => user.orders)
	user: Users;

	@OneToMany(() => OrdersDetail, (orderDetail) => orderDetail.order)
	orderDetails: OrdersDetail[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
