import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteController } from "./../../controllers/favorite-products.controllers";
import { FavoriteProductsService } from "./../../providers/favorite-products";
import { FavoriteProductsRepository } from "./../repositories/favorite-products.repositoty";
import { Favorites } from "./../tables/favorites";

@Module({
	imports: [TypeOrmModule.forFeature([Favorites])],
	controllers: [FavoriteController],
	providers: [FavoriteProductsService, FavoriteProductsRepository],
})
export class FavoriteProductsModule {}
