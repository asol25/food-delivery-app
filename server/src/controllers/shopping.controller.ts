import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateShoppingCartDto } from "./../models/dtos/create-shopping.dto";
import { UpdateShoppingCartDto } from "./../models/dtos/update-shopping.dto";
import { ShoppingService } from "./../providers/shopping.service";

@ApiTags("shopping")
@Controller("shopping")
export class ShoppingController {
	constructor(private shoppingService: ShoppingService) {}

	@Get("/:userId")
	getShoppingRecord(@Param("userId") userId: number) {
		return this.shoppingService.getShoppingRecord(userId);
	}

	@Post()
	createShoppingRecord(@Body() createShoppingCartDto: CreateShoppingCartDto) {
		return this.shoppingService.createShoppingRecord(createShoppingCartDto);
	}

	@Patch("")
	updateShoppingRecord(@Body() updateShoppingCartDto: UpdateShoppingCartDto) {
		return this.shoppingService.updateShoppingRecord(updateShoppingCartDto);
	}

	@Delete("/:orderId")
	deleteShoppingRecord(@Param("orderId") orderId: number) {
		return this.shoppingService.deleteShoppingRecord(orderId);
	}
}
