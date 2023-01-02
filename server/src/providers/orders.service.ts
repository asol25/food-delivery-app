import { DeleteByIdDto } from "./../models/dtos/delete-only-id.dto";
import { CreateOrderProductDto } from "./../models/dtos/create-order-product.dto";
import { Injectable, Logger } from "@nestjs/common";
import { GetOrderProductsDto } from "./../models/dtos/get-order-products.dto";
import { OrdersRepository } from "./../models/repositories/orders.repository";

@Injectable()
export class OrdersService {
	logger: Logger;
	constructor(private ordersRepository: OrdersRepository) {
		this.logger = new Logger(OrdersService.name);
	}

	async getOrderProductsByUserId(getOrderProductsDto: GetOrderProductsDto) {
		try {
			const products =
				this.ordersRepository.getOrderProductsByUserId(getOrderProductsDto);

			return products;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async createOrderProduct(createOrderProductDto: CreateOrderProductDto) {
		try {
			const products = this.ordersRepository.createOrderProduct(
				createOrderProductDto
			);

			return products;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async updateQuantityOrderProduct(
		createOrderProductDto: CreateOrderProductDto
	) {
		try {
			const products = this.ordersRepository.updateQuantityOrderProducts(
				createOrderProductDto
			);

			return products;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}

	async deleteOrderProduct(deleteByIdDto: DeleteByIdDto) {
		try {
			const products = this.ordersRepository.deleteOrderProducts(deleteByIdDto);

			return products;
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}
}
