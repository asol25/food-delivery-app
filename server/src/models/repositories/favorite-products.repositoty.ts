import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Users } from "../tables/users";
import { CreateFavoriteProductDto } from "./../dtos/create-favorite-product.dto";
import { Favorites } from "./../tables/favorites";
import { Products } from "./../tables/products";

@Injectable()
export class FavoriteProductsRepository extends Repository<Favorites> {
	constructor(private dataSource: DataSource) {
		super(Favorites, dataSource.createEntityManager());
	}

	async createEntity(
		createFavoriteProductDto: CreateFavoriteProductDto
	): Promise<Favorites> {
		const { product, user } = createFavoriteProductDto;
		const found = await this.findOne({
			where: {
				user: {
					id: user,
				},
				product: {
					id: product,
				},
			},
		});

		if (this.hasId(found)) throw new Error("Product already exists");

		const favorites = new Favorites();
		favorites.product = product as unknown as Products;
		favorites.user = user as unknown as Users;

		try {
			await favorites.save();
		} catch (error) {
			throw error;
		}

		return favorites;
	}

	async updateFavoriteProduct(updateFavoriteProduct: CreateFavoriteProductDto) {
		const { product, user } = updateFavoriteProduct;
		const favorites = await this.delete({
			user: {
				id: user,
			},
			product: {
				id: product,
			},
		});

		try {
			return favorites.affected;
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}
}
