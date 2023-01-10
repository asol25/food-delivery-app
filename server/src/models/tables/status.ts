import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Order_Status } from "./order-status";

@Entity()
export class Status extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	msg: string;

	@OneToMany(() => Order_Status, (order_Status) => order_Status.order)
	order_Status: Order_Status[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
