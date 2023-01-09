import { UpdateShoppingCartDto } from "./../models/dtos/update-shopping.dto";
import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateShoppingCartDto } from "./../models/dtos/create-shopping.dto";
import { ShoppingCartRepository } from "./../models/repositories/shopping-cart.repository";
import { ShoppingCart } from "./../models/tables/shopping-cart";
import { isArray } from "class-validator";

@Injectable()
export class ShoppingService {
	logger: Logger = new Logger(ShoppingService.name);
	constructor(private shoppingCartRepository: ShoppingCartRepository) {}

	async getShoppingRecord(key_user_id: number): Promise<ShoppingCart[]> {
		try {
			this.logger.log("[Service] Found shopping record...");
			const shoppingCart = await this.shoppingCartRepository.find({
				relations: {
					product: true,
				},
				where: {
					userId: key_user_id,
				},
				order: {
					createdAt: "DESC",
				},
			});

			if (isArray(shoppingCart) && shoppingCart.length === 0) {
				throw new NotFoundException("Shopping cart not found");
			}
			this.logger.log("[Service] Return shopping record...");
			return shoppingCart;
		} catch (error) {
			this.logger.log(error);
		}
	}

	async createShoppingRecord(createShoppingCartDto: CreateShoppingCartDto): Promise<ShoppingCart> {
		try {
			this.logger.log("[Service] Saving shopping record...");
			const shoppingCart = await this.shoppingCartRepository.createRecord(createShoppingCartDto);
			return shoppingCart;
		} catch (error) {
			this.logger.log(error);
		}
	}

	async updateShoppingRecord(updateShoppingCartDto: UpdateShoppingCartDto): Promise<ShoppingCart> {
		try {
			this.logger.log("[Service] Update quantity shopping record...");
			const shoppingCart = await this.shoppingCartRepository.updateRecord(updateShoppingCartDto);
			return shoppingCart;
		} catch (error) {
			this.logger.log(error);
		}
	}

	async deleteShoppingRecord(key_shopping_id: number): Promise<number> {
		try {
			this.logger.log("[Service] Delete shopping record...");
			const shoppingCart = await this.shoppingCartRepository.delete({ id: key_shopping_id });
			this.logger.log("[Service] Status: " + shoppingCart.affected);
			return shoppingCart.affected;
		} catch (error) {
			this.logger.log(error);
		}
	}
}
