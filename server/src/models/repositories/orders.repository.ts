import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateOrderProductDto } from "../dtos/create-order-product.dto";
import { DeleteByIdDto } from "./../dtos/delete-only-id.dto";
import { GetOrderProductsDto } from "./../dtos/get-order-products.dto";
import { Orders } from "./../tables/orders";

@Injectable()
export class OrdersRepository extends Repository<Orders> {
	constructor(private dataSource: DataSource) {
		super(Orders, dataSource.createEntityManager());
	}

	async getOrderProductsByUserId(
		getOrderProductsDto: GetOrderProductsDto
	): Promise<Orders[]> {
		try {
			const { key_user_id } = getOrderProductsDto;
			console.log(
				"🚀 ~ file: orders.repository.ts:19 ~ OrdersRepository ~ key_user_id",
				key_user_id
			);
			const products = await this.find({
				relations: {
					product: true,
				},
				where: {
					userId: key_user_id,
				},
			});

			return products;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async createOrderProduct(
		createOrderProductDto: CreateOrderProductDto
	): Promise<Orders> {
		try {
			const { key_user_id, key_product_id } = createOrderProductDto;
			const foundProduct = await this.findOne({
				where: {
					userId: key_user_id,
					productId: key_product_id,
				},
			});

			if (this.hasId(foundProduct) === false) {
				const products = new Orders();
				products.productId = key_product_id;
				products.userId = key_user_id;
				await products.save();
				return products;
			}
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async updateQuantityOrderProducts(
		createOrderProductDto: CreateOrderProductDto
	): Promise<Orders> {
		try {
			const { key_user_id, key_product_id, key_quantity } =
				createOrderProductDto;
			console.log(
				"🚀 ~ file: orders.repository.ts:67 ~ OrdersRepository ~ key_user_id, key_product_id, key_quantity",
				key_user_id,
				key_product_id,
				key_quantity
			);
			const foundProduct = await this.findOne({
				where: {
					userId: key_user_id,
					productId: key_product_id,
				},
			});
			foundProduct.quantity = key_quantity;
			return await foundProduct.save();
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}

	async deleteOrderProducts(deleteByIdDto: DeleteByIdDto) {
		try {
			const { key_id } = deleteByIdDto;
			const products = await this.delete({ id: Number(key_id) });

			return products;
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
