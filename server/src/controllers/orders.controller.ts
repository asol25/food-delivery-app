import { CreateOrderProductDto } from "./../models/dtos/create-order-product.dto";
import { DeleteByIdDto } from "./../models/dtos/delete-only-id.dto";
import { GetOrderProductsDto } from "./../models/dtos/get-order-products.dto";
import { OrdersService } from "./../providers/orders.service";
import { ApiTags } from "@nestjs/swagger";
import { Body, Controller, Delete, Param, Post, Put } from "@nestjs/common";

@ApiTags("orders")
@Controller("orders")
export class OrdersController {
	constructor(private ordersService: OrdersService) {}

	@Post("get-order-products")
	getOrderProductsByUserId(@Body() getOrderProductsDto: GetOrderProductsDto) {
		return this.ordersService.getOrderProductsByUserId(getOrderProductsDto);
	}

	@Post("create-order-products")
	createOrderProductsByUserId(
		@Body() createOrderProductDto: CreateOrderProductDto
	) {
		return this.ordersService.createOrderProduct(createOrderProductDto);
	}

	@Put("update-quantity-order-products")
	updateQuantityOrderProducts(
		@Body() createOrderProductDto: CreateOrderProductDto
	) {
		return this.ordersService.updateQuantityOrderProduct(createOrderProductDto);
	}

	@Delete("delete-order-products/:key_id")
	deleteOrderProduct(@Param() deleteByIdDto: DeleteByIdDto) {
		return this.ordersService.deleteOrderProduct(deleteByIdDto);
	}
}
