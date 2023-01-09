import { UpdateShoppingCartDto } from "./../dtos/update-shopping.dto";
import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateShoppingCartDto } from "./../dtos/create-shopping.dto";
import { ShoppingCart } from "./../tables/shopping-cart";

@Injectable()
export class ShoppingCartRepository extends Repository<ShoppingCart> {
	logger: Logger = new Logger(ShoppingCartRepository.name);
	constructor(private dataSource: DataSource) {
		super(ShoppingCart, dataSource.createEntityManager());
	}

	async createRecord(createShoppingCartDto: CreateShoppingCartDto) {
		const { key_user_id, key_product_id } = createShoppingCartDto;
		this.logger.log("[Repository] Starting found shopping record");
		const shoppingRecord = await this.findOneBy({ userId: key_user_id, productId: key_product_id });
		if (this.hasId(shoppingRecord) === true) {
			this.logger.warn("[Repository] Return shopping record exists");
			return shoppingRecord;
		}
		const shoppingCart = new ShoppingCart();
		shoppingCart.productId = key_product_id;
		shoppingCart.userId = key_user_id;
		this.logger.log("[Repository] Save shopping record");
		try {
			await shoppingCart.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}

		return shoppingCart;
	}

	async updateRecord(updateShoppingCartDto: UpdateShoppingCartDto) {
		const { key_shopping_id, key_product_quantity } = updateShoppingCartDto;
		this.logger.log("[Repository] Starting found shopping record");
		const shoppingRecord = await this.findOneBy({ id: key_shopping_id });
		if (this.hasId(shoppingRecord) === false) {
			this.logger.warn("[Repository] Return shopping record not exists");
			throw new InternalServerErrorException();
		}

		this.logger.log("[Repository] Save shopping record");
		shoppingRecord.quantity = key_product_quantity;
		try {
			await shoppingRecord.save();
		} catch (error) {
			throw error;
		}

		return shoppingRecord;
	}
}
