import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { NotificationsDetail } from "./notificationsDetail";
import { Orders } from "./orders";
import { Users } from "./users";

@Entity()
export class Schedules extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	userId!: number;

	@ManyToOne(() => Users, (user) => user.Schedules)
	@JoinTable()
	user: Users;

	@ManyToMany(() => Orders)
	@JoinTable()
	orders: Orders[];

	@OneToMany(() => NotificationsDetail, (notificationsDetail) => notificationsDetail.schedules)
	@JoinTable()
	notificationsDetail: NotificationsDetail[];

	@Column({ type: "timestamp" })
	from: Date;

	@Column({ type: "timestamp", nullable: true })
	ship!: Date;

	@Column({ type: "timestamp", nullable: true })
	to!: Date;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
