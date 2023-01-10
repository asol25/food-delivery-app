import { Order_Status } from "./order-status";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { OrderDetails } from "./order-details";
import { Status } from "./status";
import { Schedules } from "./schedules";
import { Transaction } from "./transaction";
import { Users } from "./users";

@Entity()
export class Orders extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	userId!: number;

	@Column({ nullable: true })
	scheduleId!: number;

	@Column({ nullable: true })
	transactionId!: number;

	@ManyToOne(() => Users, (users: Users) => users.orders)
	@JoinColumn()
	user: Users;

	@OneToOne(() => Schedules)
	@JoinColumn({ name: "scheduleId" })
	schedule: Schedules;

	@OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
	orderDetails: OrderDetails[];

	@OneToMany(() => Order_Status, (order_Status) => order_Status.order)
	order_Status: Order_Status[];

	@OneToOne(() => Transaction)
	@JoinColumn({ name: "transactionId" })
	transaction: Transaction;

	@ManyToMany(() => Status)
	@JoinTable()
	status: Status[];

	@Column({ nullable: true })
	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
