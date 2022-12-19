import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";

export enum EventRole {
	BUY = "buy",
	CANCEL = "cancel",
	REFUND = "refund",
	SHIP = "ship",
}

@Entity()
export class Notifications {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	message: string;

	@Column({
		type: "enum",
		enum: EventRole,
		default: EventRole.BUY,
	})
	role: EventRole;

	@CreateDateColumn({ name: "created_at" })
	createdAt: Date;

	@UpdateDateColumn({ name: "updated_at" })
	updatedAt: Date;
}
