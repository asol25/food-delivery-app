import { IsInt } from "class-validator";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Orders } from "./orders";
import { Products } from "./products";

@Entity()
export class OrdersDetail extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	@IsInt()
	quantity: number;

	@ManyToOne(() => Products, (product) => product.ordersDetail)
	product: Products;

	@ManyToOne(() => Orders, (order) => order.orderDetails)
	order: Orders;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
