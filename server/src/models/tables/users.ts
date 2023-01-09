import { IsBoolean, IsEmail } from "class-validator";
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
import { Addresses } from "./addresses";
import { Comments } from "./comments";
import { Favorites } from "./favorites";
import { Receiver } from "./message_receiver";
import { Sender } from "./message_sender";
import { NotificationsDetail } from "./notificationsDetail";
import { Orders } from "./orders";
import { Schedules } from "./schedules";
import { ShoppingCart } from "./shopping-cart";
import { Transaction } from "./transaction";

@Entity()
export class Users extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	@IsEmail()
	email: string;

	@Column({ nullable: true })
	phone!: string;

	@Column({ nullable: true })
	picture!: string;

	@Column({ default: "user" })
	role: string;

	@Column({ default: true })
	@IsBoolean()
	status: boolean;

	@Column({ default: false })
	@IsBoolean()
	online: boolean;

	@Column({ nullable: true })
	addressesId!: number;

	@ManyToOne(() => Addresses, (addresses) => addresses.users)
	@JoinColumn({ name: "addressesId" })
	addresses: Addresses;

	@OneToMany(() => Comments, (comment) => comment.users)
	comments: Comments[];

	@OneToMany(() => Transaction, (Transaction) => Transaction.user)
	transactions: Transaction[];

	@OneToMany(() => Orders, (order) => order.user)
	orders: Orders[];

	@OneToMany(() => Favorites, (favorite) => favorite.user)
	favorites: Favorites[];

	@OneToMany(() => ShoppingCart, (ShoppingCart) => ShoppingCart.user)
	shopping!: ShoppingCart[];

	@OneToOne(() => Receiver)
	@JoinColumn()
	receiver: Receiver;

	@OneToOne(() => Sender)
	@JoinColumn()
	sender: Sender;

	@OneToMany(() => NotificationsDetail, (notificationsDetail) => notificationsDetail.user)
	notificationsDetail!: NotificationsDetail[];

	@OneToMany(() => Schedules, (Schedules) => Schedules.user)
	Schedules: Schedules[];

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
