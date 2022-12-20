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
import { Analysis } from "./analytsis";
import { Categories } from "./categories";
import { Comments } from "./comments";
import { Favorites } from "./favorites";
import { NotificationToProductsAndUsers } from "./notificationToProductsAndUsers";
import { Orders } from "./orders";
import { OrdersDetail } from "./orders_detail";
import { SchedulesToProductsAndUsers } from "./schedulesToProductsAndUsers";

@Entity()
export class Products extends BaseEntity {
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

	@ManyToOne(() => Categories, (category) => category.products)
	category: Categories;

	@OneToMany(() => Favorites, (favorite) => favorite.product)
	favorites: Favorites[];

	@OneToMany(() => OrdersDetail, (orderDetail) => orderDetail.product)
	ordersDetail: OrdersDetail[];

	@OneToMany(
		() => NotificationToProductsAndUsers,
		(notificationToProductsAndUsers) => notificationToProductsAndUsers.products
	)
	notificationToProductsAndUsers!: NotificationToProductsAndUsers[];

	@OneToMany(
		() => SchedulesToProductsAndUsers,
		(schedulesToProductsAndUser) => schedulesToProductsAndUser.products
	)
	schedulesToProductsAndUsers!: SchedulesToProductsAndUsers[];

	@OneToOne(() => Analysis)
	@JoinColumn()
	Analysis: Analysis;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
