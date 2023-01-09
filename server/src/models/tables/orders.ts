import { Transaction } from "./transaction";
import { OrderDetails } from "./order-details";
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
import { Users } from "./users";

@Entity()
export class Orders extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	userId!: number;

	@Column({ nullable: true })
	transactionId!: number;

	@ManyToOne(() => Users, (users: Users) => users.orders)
	@JoinColumn()
	user: Users;

	@OneToMany(() => OrderDetails, (orderDetails) => orderDetails.order)
	orderDetails: OrderDetails[];

	@OneToOne(() => Transaction)
	@JoinColumn({ name: "transactionId" })
	transaction: Transaction;

	@Column({ nullable: true })
	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
