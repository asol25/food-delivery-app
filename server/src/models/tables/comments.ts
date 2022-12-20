import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Products } from "./products";
import { Users } from "./users";

@Entity()
export class Comments extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	message: string;

	@ManyToOne(() => Products, (product) => product.comments)
	product: Products;

	@ManyToOne(() => Users, (user) => user.comments)
	users: Users;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
