import { Orders } from "./orders";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Products } from "./products";
import { Users } from "./users";

@Entity()
export class OrderDetails extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	orderId!: number;

	@Column({ nullable: true })
	productId!: number;

	@Column({ default: 1 })
	quantity: number;

	@ManyToOne(() => Orders, (orders) => orders.orderDetails)
	@JoinColumn({ name: "orderId" })
	order: Orders;

	@ManyToOne(() => Products, (products) => products.OrderDetails)
	@JoinColumn({ name: "productId" })
	product: Products;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
