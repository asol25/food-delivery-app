import {
	BaseEntity,
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	JoinTable,
	ManyToMany,
	ManyToOne,
	OneToMany,
	OneToOne,
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
	@JoinTable({ name: "userId" })
	user: Users;

	@OneToMany(() => NotificationsDetail, (notificationsDetail) => notificationsDetail.schedules)
	@JoinTable()
	notificationsDetail: NotificationsDetail[];

	@Column()
	timer: string;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
