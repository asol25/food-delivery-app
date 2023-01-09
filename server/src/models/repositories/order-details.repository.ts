import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ICreateOrderProductRepository } from "../types";
import { OrderDetails } from "./../tables/order-details";

@Injectable()
export class OrderDetailsRepository extends Repository<OrderDetails> {
	logger: Logger = new Logger(OrderDetailsRepository.name);
	constructor(private dataSource: DataSource) {
		super(OrderDetails, dataSource.createEntityManager());
	}

	async createRecord(createOrderDetailDto: ICreateOrderProductRepository): Promise<OrderDetails> {
		const { key_order_id, key_product_id, key_product_quantity } = createOrderDetailDto;
		this.logger.log("[Repository] - Create OrderDetail Record with key: Order =  " + key_order_id);
		const orderDetail = new OrderDetails();
		orderDetail.orderId = key_order_id;
		orderDetail.productId = key_product_id;
		orderDetail.quantity = key_product_quantity;
		try {
			await orderDetail.save();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
		return orderDetail;
	}
}
