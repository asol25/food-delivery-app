import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users";

@Entity()
export class Employees {
	@PrimaryGeneratedColumn()
	id: number;
}
