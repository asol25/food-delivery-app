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
import { Products } from "./products";
import { Users } from "./users";

@Entity()
export class ShoppingCart extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	userId!: number;

	@Column({ nullable: true })
	productId!: number;

	@Column({ default: 1 })
	quantity: number;

	@ManyToOne(() => Users, (user) => user.shopping)
	@JoinTable({ name: "userId" })
	user: Users;

	@ManyToOne(() => Products, (products) => products.shopping)
	@JoinTable({ name: "productId" })
	product: Products;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
