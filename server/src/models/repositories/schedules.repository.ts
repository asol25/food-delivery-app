import { CreateTransactionDto } from "./../dtos/create-transaction.dto";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { Repository, DataSource } from "typeorm";
import { Transaction } from "../tables/transaction";
import { Schedules } from "../tables/schedules";
import { CreateScheduleDto } from "../dtos/create-schedules.dto";

@Injectable()
export class SchedulesRepository extends Repository<Schedules> {
	logger: Logger = new Logger(SchedulesRepository.name);
	constructor(private dataSource: DataSource) {
		super(Schedules, dataSource.createEntityManager());
	}

	async createRecord(createScheduleDto: CreateScheduleDto): Promise<Schedules> {
		const { key_user_id, schedule_timer } = createScheduleDto;
		const schedule = new Schedules();
		schedule.userId = key_user_id;
		schedule.timer = schedule_timer;
		try {
			await schedule.save();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
		return schedule;
	}
}
