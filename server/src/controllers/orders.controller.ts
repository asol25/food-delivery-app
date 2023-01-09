import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateOrderDetailDto } from "./../models/dtos/create-order-details.dto";
import { OrderDetails } from "./../models/tables/order-details";
import { OrdersService } from "./../providers/orders.service";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
	constructor(private ordersService: OrdersService) {}

	@Post("order-details")
	async createOrderDetails(
		@Body() createOrderDetailDto: CreateOrderDetailDto
	): Promise<OrderDetails[]> {
		return this.ordersService.createOrderDetails(createOrderDetailDto);
	}
}
