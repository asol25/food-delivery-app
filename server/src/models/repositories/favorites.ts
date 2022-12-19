import {
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
export class Favorites {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Products, (product) => product.favorites)
	product: Products;

	@ManyToMany(() => Users)
	@JoinTable()
	users: Users[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
