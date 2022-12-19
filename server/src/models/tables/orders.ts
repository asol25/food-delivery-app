import { IsInt } from "class-validator";
import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
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

	@Column()
	@IsInt()
	cost: number;

	@ManyToOne(() => Users, (user) => user.orders)
	user: Users;

	@ManyToMany(() => Products, (product) => product.orders)
	product: Products;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
