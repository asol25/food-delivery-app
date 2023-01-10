import { Max, Min } from "class-validator";
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
import { Users } from "./users";

@Entity()
export class Transaction extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	userId!: number;

	@Column({ default: false })
	status: boolean;

	@Column({ nullable: true })
	@Min(0)
	@Max(10)
	bank!: string;

	@Column({ default: 0 })
	@Min(0)
	amount: number;

	@ManyToOne(() => Users, (user) => user.transactions)
	@JoinTable()
	user: Users;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
