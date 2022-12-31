import { ProductsRepository } from "./../models/repositories/products.repository";
import { BadRequestException, Injectable, Logger } from "@nestjs/common";
import { CreateFavoriteProductDto } from "./../models/dtos/create-favorite-product.dto";
import { FavoriteProductsRepository } from "./../models/repositories/favorite-products.repositoty";
import { Favorites } from "./../models/tables/favorites";
import { isArray } from "class-validator";

@Injectable()
export class FavoriteProductsService {
	logger: Logger;
	constructor(private favoriteProductsRepository: FavoriteProductsRepository) {
		this.logger = new Logger(FavoriteProductsService.name);
	}

	async getFavoriteProductsByUserID(userID: number): Promise<Favorites[]> {
		try {
			const productsRepositoryObject: Favorites[] =
				await this.favoriteProductsRepository.find({
					relations: {
						product: true,
					},
					where: {
						user: {
							id: userID,
						},
					},
				});

			if (
				!isArray(productsRepositoryObject) ||
				productsRepositoryObject.length === 0
			)
				throw new Error("user don't have favorite products");
			return productsRepositoryObject;
		} catch (error) {
			this.logger.error(error);
		}
	}

	async createProduct(createFavoriteProductDto: CreateFavoriteProductDto) {
		try {
			const product: Favorites =
				await this.favoriteProductsRepository.createEntity(
					createFavoriteProductDto
				);

			return product;
		} catch (error) {
			this.logger.error(error.message);
			throw error;
		}
	}

	async updateProducts(updateFavoriteProductDto: CreateFavoriteProductDto) {
		try {
			const product =
				await this.favoriteProductsRepository.updateFavoriteProduct(
					updateFavoriteProductDto
				);

			return product;
		} catch (error) {
			this.logger.error(error.message);
			throw error;
		}
	}
}
