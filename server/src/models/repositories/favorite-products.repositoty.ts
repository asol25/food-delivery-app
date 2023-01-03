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

	async createEntity(createFavoriteProductDto: CreateFavoriteProductDto): Promise<Favorites> {
		const { key_product_id, key_user_id } = createFavoriteProductDto;
		const favoriteRecord = await this.findOne({
			where: {
				user: {
					id: key_user_id,
				},
				product: {
					id: key_product_id,
				},
			},
		});

		if (this.hasId(favoriteRecord))
			throw new Error(`The customer has like #${favoriteRecord.id} favoriteRecord`);

		const favorites = new Favorites();
		favorites.product = key_product_id as unknown as Products;
		favorites.user = key_user_id as unknown as Users;

		try {
			await favorites.save();
		} catch (error) {
			throw new InternalServerErrorException();
		}

		return favorites;
	}

	async updateFavoriteProduct(updateFavoriteProduct: CreateFavoriteProductDto) {
		const { key_product_id, key_user_id } = updateFavoriteProduct;
		const favoriteRecord = await this.delete({
			user: {
				id: key_user_id,
			},
			product: {
				id: key_product_id,
			},
		});

		try {
			return favoriteRecord.affected;
		} catch (error) {
			throw new InternalServerErrorException();
		}
	}
}
