import { EmployerService } from "./../providers/employer.service";
import { UpdateStatusUsersDto } from "./../models/dtos/update-users-status.dto";
import { CreateUserDto } from "./../models/dtos/create-users.dto";
import { GetUsersPaginationDto } from "./../models/dtos/get-users-pagination.dto";
import { UsersService } from "./../providers/users.service";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("employer")
@Controller("employer")
export class EmployerController {
	constructor(private employerService: EmployerService) {}

	@Get("pagination/:page/:limit")
	getUsersWithPagination(
		@Param() getUsersPaginationDto: GetUsersPaginationDto
	) {
		return this.employerService.getEmployerWithPagination(
			getUsersPaginationDto
		);
	}

	@Post("create/employer")
	createUser(@Body() createUserDto: CreateUserDto) {
		return this.employerService.createEmployer(createUserDto);
	}

	@Put("banned")
	bannedUser(@Body() updateStatusUsersDto: UpdateStatusUsersDto) {
		return this.employerService.updateStatusEmployer(updateStatusUsersDto);
	}
}
