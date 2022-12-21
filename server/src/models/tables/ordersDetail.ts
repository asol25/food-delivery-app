import { IsInt } from "class-validator";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryColumn,
	UpdateDateColumn,
} from "typeorm";
import { Orders } from "./orders";
import { Products } from "./products";

@Entity()
export class OrdersDetail extends BaseEntity {
	@PrimaryColumn()
	productId: number;

	@PrimaryColumn()
	orderId: number;

	@Column({ default: 1 })
	@IsInt()
	quantity!: number;

	@ManyToOne(() => Products, (product) => product.ordersDetail)
	@JoinColumn({ name: "productId" })
	product!: Products;

	@ManyToOne(() => Orders, (order) => order.orderDetails)
	@JoinColumn({ name: "orderId" })
	order!: Orders;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
