import { ShoppingCart } from "./shopping-cart";
import { OrderDetails } from "./order-details";
import { IsInt, Max, Min } from "class-validator";
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
import { Analysis } from "./analysis";
import { Categories } from "./categories";
import { Comments } from "./comments";
import { Favorites } from "./favorites";
import { NotificationsDetail } from "./notificationsDetail";
import { Orders } from "./orders";

export class ColumnNumericTransformer {
	to(data: number): number {
		return data;
	}
	from(data: string): number {
		return parseFloat(data);
	}
}

@Entity()
export class Products extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	desc: string;

	@Column({ nullable: true })
	status!: string;

	@Column({ nullable: true })
	thumbnail: string;

	@Column({ default: 0 })
	@IsInt()
	@Min(0)
	@Max(5)
	rating!: number;

	@Column("numeric", {
		precision: 7,
		scale: 2,
		transformer: new ColumnNumericTransformer(),
	})
	@IsInt()
	@Min(0)
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

	@Column()
	categoryId: number;

	@ManyToOne(() => Categories, (category) => category.products)
	@JoinColumn({ name: "categoryId" })
	category: Categories;

	@OneToMany(() => Favorites, (favorite) => favorite.product)
	favorites: Favorites[];

	@OneToMany(() => OrderDetails, (OrderDetails) => OrderDetails.product)
	OrderDetails!: OrderDetails[];

	@OneToMany(() => ShoppingCart, (ShoppingCart) => ShoppingCart.product)
	shopping!: ShoppingCart[];

	@OneToMany(() => NotificationsDetail, (notificationsDetail) => notificationsDetail.product)
	notificationsDetail!: NotificationsDetail[];

	@OneToOne(() => Analysis)
	@JoinColumn()
	Analysis: Analysis;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
