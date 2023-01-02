import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Products } from "./products";
import { Users } from "./users";

@Entity()
export class Orders extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	userId!: number;

	@Column({ nullable: true })
	productId!: number;

	@Column({ default: 1 })
	quantity: number;

	@ManyToOne(() => Users, (user) => user.orders)
	@JoinColumn({ name: "userId" })
	user!: Users;

	@ManyToOne(() => Products, (products) => products.orders)
	@JoinColumn({ name: "productId" })
	product!: Products;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
