import { UpdateStatusUsersDto } from "./../models/dtos/update-users-status.dto";
import { CreateUserDto } from "./../models/dtos/create-users.dto";
import { GetUsersPaginationDto } from "./../models/dtos/get-users-pagination.dto";
import { UsersService } from "./../providers/users.service";
import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private usersService: UsersService) {}

	@Get("pagination/:page/:limit")
	getUsersWithPagination(
		@Param() getUsersPaginationDto: GetUsersPaginationDto
	) {
		return this.usersService.getUsersWithPagination(getUsersPaginationDto);
	}

	@Post("create/user")
	createUser(@Body() createUserDto: CreateUserDto) {
		return this.usersService.createUser(createUserDto);
	}

	@Put("banned")
	bannedUser(@Body() updateStatusUsersDto: UpdateStatusUsersDto) {
		return this.usersService.updateStatusUser(updateStatusUsersDto);
	}
}
