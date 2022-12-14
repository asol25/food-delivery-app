import { SchedulesRepository } from "./../models/repositories/schedules.repository";
import { Injectable, Logger } from "@nestjs/common";
import { CreateOrderDetailDto } from "./../models/dtos/create-order-details.dto";
import { OrderDetailsRepository } from "./../models/repositories/order-details.repository";
import { OrdersRepository } from "./../models/repositories/orders.repository";
import { OrderDetails } from "./../models/tables/order-details";
@Injectable()
export class OrdersService {
	logger: Logger;
	constructor(
		private ordersRepository: OrdersRepository,
		private orderDetailsRepository: OrderDetailsRepository
	) {
		this.logger = new Logger(OrdersService.name);
	}

	async createOrderDetails(createOrderDetailDto: CreateOrderDetailDto): Promise<OrderDetails[]> {
		try {
			const { products } = createOrderDetailDto;
			const { id } = await this.ordersRepository.createRecord(createOrderDetailDto);

			const promiseOrderDetails: Promise<OrderDetails>[] = products.map((product) => {
				return this.orderDetailsRepository.createRecord({
					key_order_id: id,
					key_product_id: product.key_product_id,
					key_product_quantity: product.key_product_quantity,
				});
			});
			return Promise.all(promiseOrderDetails).then((values) => {
				return values;
			});
		} catch (error) {
			this.logger.error(error);
			throw error;
		}
	}
}
