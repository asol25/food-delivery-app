import {
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
export class Comments {
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
