import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Orders } from "./orders";
import { Status } from "./status";

const PENDING_PAYMENT = 4;
@Entity()
export class Order_Status extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	orderId!: number;

	@Column({ default: PENDING_PAYMENT })
	statusId!: number;

	@ManyToOne(() => Orders, (order) => order.order_Status)
	@JoinTable({ name: "orderId" })
	order: Orders;

	@ManyToOne(() => Status, (status) => status.order_Status)
	@JoinTable({ name: "statusId" })
	status: Status;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
