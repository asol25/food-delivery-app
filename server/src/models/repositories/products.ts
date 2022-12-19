import { Favorites } from "./favorites";
import { IsInt, Max, Min } from "class-validator";
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	JoinColumn,
	OneToOne,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from "typeorm";
import { Categories } from "./categories";
import { Comments } from "./comments";
import { Orders } from "./orders";

@Entity()
export class Products {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	desc: string;

	@Column()
	thumbnail: string;

	@Column({ default: 0 })
	@IsInt()
	@Min(0)
	@Max(5)
	rating!: number;

	@Column({ default: 3 })
	@IsInt()
	@Min(3)
	cost: number;

	@Column({ default: 5 })
	@IsInt()
	@Min(5)
	@Max(100)
	sale: number;

	@Column({ default: 0 })
	@IsInt()
	@Min(0)
	views: number;

	@OneToMany(() => Comments, (comment) => comment.product)
	comments: Comments[];

	@OneToOne(() => Categories)
	@JoinColumn()
	category: Categories;

	@OneToMany(() => Favorites, (favorite) => favorite.product)
	favorites: Favorites[];

	@OneToMany(() => Orders, (order) => order.product)
	orders: Orders[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
